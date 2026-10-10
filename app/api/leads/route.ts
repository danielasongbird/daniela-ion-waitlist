import { normalizeLeadPayload, requestOriginIsAllowed, type LeadPayload } from '../../lib/leadCapture.ts';

const MAX_BODY_BYTES = 16_384;

type SupabaseLead = {
  email_sent_at: string | null;
  id: string;
};

class IntegrationError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function requiredEnvironment(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new IntegrationError(`missing_${name.toLowerCase()}`);
  return value;
}

function supabaseSecretKey(): string {
  const key = process.env.SUPABASE_SECRET_KEY?.trim() ?? process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) throw new IntegrationError('missing_supabase_secret_key');
  return key;
}

function parsePositiveInteger(value: string, name: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new IntegrationError(`invalid_${name.toLowerCase()}`);
  }
  return parsed;
}

async function parseRequest(request: Request): Promise<unknown> {
  const contentLength = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (contentLength > MAX_BODY_BYTES) throw new IntegrationError('payload_too_large');

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) throw new IntegrationError('unsupported_content_type');

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    throw new IntegrationError('payload_too_large');
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new IntegrationError('invalid_json');
  }
}

function supabaseHeaders(secretKey: string, prefer?: string): HeadersInit {
  return {
    apikey: secretKey,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function upsertLead(payload: LeadPayload): Promise<SupabaseLead> {
  const supabaseUrl = requiredEnvironment('SUPABASE_URL').replace(/\/$/, '');
  const secretKey = supabaseSecretKey();
  const submittedAt = new Date().toISOString();
  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_leads?on_conflict=email,flow`, {
    body: JSON.stringify({
      consent: payload.consent,
      consent_at: submittedAt,
      consent_source: payload.flow,
      email: payload.email,
      first_name: payload.firstName,
      flow: payload.flow,
      landing_path: payload.landingPath,
      quiz_answers: payload.quizAnswers,
      result_signal: payload.resultSignal,
      updated_at: submittedAt,
      utm_campaign: payload.utmCampaign,
      utm_medium: payload.utmMedium,
      utm_source: payload.utmSource,
      waitlist_version: payload.waitlistVersion,
    }),
    headers: supabaseHeaders(secretKey, 'resolution=merge-duplicates,return=representation'),
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new IntegrationError('supabase_upsert_failed');
  const rows = await response.json() as SupabaseLead[];
  if (!rows[0]?.id) throw new IntegrationError('supabase_response_invalid');
  return rows[0];
}

async function updateLeadDelivery(leadId: string, values: Record<string, string | null>): Promise<void> {
  const supabaseUrl = requiredEnvironment('SUPABASE_URL').replace(/\/$/, '');
  const secretKey = supabaseSecretKey();
  const response = await fetch(`${supabaseUrl}/rest/v1/waitlist_leads?id=eq.${encodeURIComponent(leadId)}`, {
    body: JSON.stringify({ ...values, updated_at: new Date().toISOString() }),
    headers: supabaseHeaders(secretKey),
    method: 'PATCH',
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new IntegrationError('supabase_delivery_update_failed');
}

function brevoHeaders(apiKey: string): HeadersInit {
  return {
    Accept: 'application/json',
    'api-key': apiKey,
    'Content-Type': 'application/json',
  };
}

async function syncBrevoContact(payload: LeadPayload): Promise<void> {
  const apiKey = requiredEnvironment('BREVO_API_KEY');
  const listVariable = payload.flow === 'audio' ? 'BREVO_AUDIO_LIST_ID' : 'BREVO_WAITLIST_LIST_ID';
  const listId = parsePositiveInteger(requiredEnvironment(listVariable), listVariable);
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    body: JSON.stringify({
      attributes: payload.firstName ? { FIRSTNAME: payload.firstName } : undefined,
      email: payload.email,
      listIds: [listId],
      updateEnabled: true,
    }),
    headers: brevoHeaders(apiKey),
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new IntegrationError('brevo_contact_sync_failed');
}

async function sendTemplateEmail(
  payload: LeadPayload,
  templateId: number,
  params: Record<string, string>,
): Promise<void> {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    body: JSON.stringify({
      params,
      templateId,
      to: [{ email: payload.email, ...(payload.firstName ? { name: payload.firstName } : {}) }],
    }),
    headers: brevoHeaders(requiredEnvironment('BREVO_API_KEY')),
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new IntegrationError('brevo_email_send_failed');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function waitlistConfirmationHtml(firstName: string): string {
  const name = escapeHtml(firstName || 'there');
  const returnUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://waitlist.danielaion.com/waitlist';

  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>You’re on the Soul Portal waitlist</title></head>
  <body style="margin:0;padding:0;background:#f7ddd2;color:#372044;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your private invitation is saved.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f7ddd2;">
      <tr><td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;border:1px solid #372044;background:#fff9f3;box-shadow:8px 8px 0 #a9727a;">
          <tr><td align="center" style="padding:28px;border-bottom:1px solid #ead7d5;"><div style="font-family:Georgia,serif;font-size:20px;font-weight:700;">Soul Portal</div><div style="margin-top:3px;font-family:Georgia,serif;font-size:12px;font-style:italic;color:#a9727a;">Splendour of Unique Love</div></td></tr>
          <tr><td style="padding:46px 42px 38px;">
            <div style="font-family:'Segoe Print',cursive;font-size:20px;font-weight:700;color:#a84c79;">Your private invitation</div>
            <h1 style="margin:12px 0 22px;font-family:Georgia,serif;font-size:43px;line-height:1.02;color:#372044;">You’re on the<br>Soul Portal waitlist.</h1>
            <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;">Hi ${name},</p>
            <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;">Thank you for joining Soul Portal. Your place is saved, and you’ll be among the first to hear when the private reveal and early access open.</p>
            <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;">Until then, remember: you don’t need more strategy. You need to lead with your frequency.</p>
            <p style="margin-top:30px;"><a href="${escapeHtml(returnUrl)}" style="display:inline-block;padding:16px 24px;border:1px solid #372044;background:#a9727a;color:#fff9f3;font-family:Arial,sans-serif;font-size:12px;font-weight:700;text-decoration:none;text-transform:uppercase;">Return to Soul Portal&nbsp;&nbsp;→</a></p>
            <p style="margin-top:40px;padding-top:26px;border-top:1px solid #ead7d5;font-family:Georgia,serif;font-size:20px;font-weight:700;">This is my soul speaking to yours.</p>
            <p style="font-family:'Segoe Print',cursive;font-size:22px;font-weight:700;color:#a84c79;">Daniela</p>
          </td></tr>
          <tr><td align="center" style="padding:22px 28px;background:#372044;color:#fff9f3;font-family:Arial,sans-serif;font-size:11px;line-height:1.6;">You received this email because you joined the Soul Portal waitlist. Reply if you need anything or no longer wish to hear from us.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function sendWaitlistConfirmationEmail(payload: LeadPayload): Promise<void> {
  const firstName = payload.firstName?.trim() ?? '';
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    body: JSON.stringify({
      htmlContent: waitlistConfirmationHtml(firstName),
      replyTo: {
        email: process.env.BREVO_REPLY_TO_EMAIL?.trim() || 'daniela@jacobsenoffice.com',
        name: 'Daniela Ion',
      },
      sender: {
        email: process.env.BREVO_SENDER_EMAIL?.trim() || 'hello@danielaion.com',
        name: 'Daniela Ion',
      },
      subject: 'You’re on the Soul Portal waitlist',
      textContent: `Hi ${firstName || 'there'},\n\nYou’re on the Soul Portal waitlist. Your place is saved, and you’ll be among the first to hear when the private reveal and early access open.\n\nThis is my soul speaking to yours.\nDaniela`,
      to: [{ email: payload.email, ...(firstName ? { name: firstName } : {}) }],
    }),
    headers: brevoHeaders(requiredEnvironment('BREVO_API_KEY')),
    method: 'POST',
    redirect: 'error',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new IntegrationError('brevo_email_send_failed');
}

async function sendAudioEmail(payload: LeadPayload): Promise<void> {
  const templateId = parsePositiveInteger(requiredEnvironment('BREVO_AUDIO_TEMPLATE_ID'), 'BREVO_AUDIO_TEMPLATE_ID');
  await sendTemplateEmail(payload, templateId, {
    AUDIO_URL: process.env.SOUL_AUDIO_URL?.trim() ?? '',
    FIRSTNAME: payload.firstName ?? '',
    RESULT_SIGNAL: payload.resultSignal ?? '',
  });
}

export async function POST(request: Request): Promise<Response> {
  try {
    if (!requestOriginIsAllowed(request, process.env.ALLOWED_ORIGINS)) {
      return json({ ok: false, message: 'This request is not allowed.' }, 403);
    }

    const payload = normalizeLeadPayload(await parseRequest(request));
    if (!payload) return json({ ok: false, message: 'Please check your details and consent.' }, 400);
    if (payload.company) return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });

    const lead = await upsertLead(payload);
    await syncBrevoContact(payload);

    if (!lead.email_sent_at) {
      try {
        if (payload.flow === 'audio') await sendAudioEmail(payload);
        else await sendWaitlistConfirmationEmail(payload);

        const deliveredAt = new Date().toISOString();
        await updateLeadDelivery(lead.id, {
          brevo_contact_synced_at: deliveredAt,
          delivery_status: payload.flow === 'waitlist' ? 'confirmed' : 'sent',
          email_sent_at: deliveredAt,
        });
      } catch (error) {
        await updateLeadDelivery(lead.id, {
          brevo_contact_synced_at: new Date().toISOString(),
          delivery_status: 'failed',
        });
        throw error;
      }
    } else {
      await updateLeadDelivery(lead.id, {
        brevo_contact_synced_at: new Date().toISOString(),
        delivery_status: payload.flow === 'waitlist' ? 'confirmed' : 'sent',
      });
    }

    return json({ ok: true }, 200);
  } catch (error) {
    const code = error instanceof IntegrationError ? error.code : 'unexpected_error';
    console.error(`Lead integration failed: ${code}`);
    const status = code === 'payload_too_large'
      ? 413
      : code === 'invalid_json' || code === 'unsupported_content_type'
        ? 400
        : 502;
    return json({ ok: false, message: 'We could not save your details. Please try again.' }, status);
  }
}

export function OPTIONS(request: Request): Response {
  if (!requestOriginIsAllowed(request, process.env.ALLOWED_ORIGINS)) {
    return new Response(null, { status: 403 });
  }
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}
