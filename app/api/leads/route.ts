import { normalizeLeadPayload, requestOriginIsAllowed, type LeadPayload } from '../../lib/leadCapture.ts';

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
  if (!Number.isSafeInteger(parsed) || parsed <= 0) throw new IntegrationError(`invalid_${name.toLowerCase()}`);
  return parsed;
}

async function parseRequest(request: Request): Promise<unknown> {
  const contentLength = Number.parseInt(request.headers.get('content-length') ?? '0', 10);
  if (contentLength > 16_384) throw new IntegrationError('payload_too_large');

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) throw new IntegrationError('unsupported_content_type');

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 16_384) throw new IntegrationError('payload_too_large');
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
  });

  if (!response.ok) throw new IntegrationError('brevo_contact_sync_failed');
}

async function sendAudioEmail(payload: LeadPayload): Promise<void> {
  const apiKey = requiredEnvironment('BREVO_API_KEY');
  const templateId = parsePositiveInteger(requiredEnvironment('BREVO_AUDIO_TEMPLATE_ID'), 'BREVO_AUDIO_TEMPLATE_ID');
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    body: JSON.stringify({
      params: {
        AUDIO_URL: process.env.SOUL_AUDIO_URL?.trim() ?? '',
        FIRSTNAME: payload.firstName ?? '',
        RESULT_SIGNAL: payload.resultSignal ?? '',
      },
      templateId,
      to: [{ email: payload.email, ...(payload.firstName ? { name: payload.firstName } : {}) }],
    }),
    headers: brevoHeaders(apiKey),
    method: 'POST',
  });

  if (!response.ok) throw new IntegrationError('brevo_email_send_failed');
}

export async function POST(request: Request): Promise<Response> {
  try {
    if (!requestOriginIsAllowed(request, process.env.ALLOWED_ORIGINS)) {
      return Response.json({ ok: false }, { status: 403 });
    }

    const payload = normalizeLeadPayload(await parseRequest(request));
    if (!payload) return Response.json({ ok: false }, { status: 400 });
    if (payload.company) return new Response(null, { status: 204 });

    const lead = await upsertLead(payload);
    await syncBrevoContact(payload);

    if (payload.flow === 'audio' && !lead.email_sent_at) {
      try {
        await sendAudioEmail(payload);
        const deliveredAt = new Date().toISOString();
        await updateLeadDelivery(lead.id, {
          brevo_contact_synced_at: deliveredAt,
          delivery_status: 'sent',
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
        delivery_status: payload.flow === 'waitlist' ? 'subscribed' : 'sent',
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    const code = error instanceof IntegrationError ? error.code : 'unexpected_error';
    console.error(`Lead integration failed: ${code}`);
    const status = code === 'payload_too_large'
      ? 413
      : code === 'invalid_json' || code === 'unsupported_content_type'
        ? 400
        : 502;
    return Response.json({ ok: false }, { status });
  }
}

export function OPTIONS(request: Request): Response {
  if (!requestOriginIsAllowed(request, process.env.ALLOWED_ORIGINS)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}
