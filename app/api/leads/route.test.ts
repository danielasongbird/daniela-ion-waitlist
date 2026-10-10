import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import { normalizeLeadPayload, requestOriginIsAllowed } from '../../lib/leadCapture.ts';
import { POST } from './route.ts';

const originalFetch = globalThis.fetch;
const environmentNames = [
  'ALLOWED_ORIGINS',
  'BREVO_API_KEY',
  'BREVO_AUDIO_LIST_ID',
  'BREVO_AUDIO_TEMPLATE_ID',
  'BREVO_WAITLIST_LIST_ID',
  'SUPABASE_SECRET_KEY',
  'SUPABASE_URL',
] as const;
const originalEnvironment = Object.fromEntries(environmentNames.map((name) => [name, process.env[name]]));

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const name of environmentNames) {
    const value = originalEnvironment[name];
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function leadRequest(body: Record<string, unknown>, origin = 'https://example.com') {
  return new Request(`${origin}/api/leads`, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Origin: origin },
    method: 'POST',
  });
}

function configureIntegration(origin = 'https://example.com') {
  process.env.ALLOWED_ORIGINS = origin;
  process.env.BREVO_API_KEY = 'test-key';
  process.env.BREVO_AUDIO_LIST_ID = '12';
  process.env.BREVO_AUDIO_TEMPLATE_ID = '34';
  process.env.BREVO_WAITLIST_LIST_ID = '7';
  process.env.SUPABASE_SECRET_KEY = 'test-secret-key';
  process.env.SUPABASE_URL = 'https://project.supabase.co';
}

test('normalizes supported lead fields and rejects invalid consent or flows', () => {
  const lead = normalizeLeadPayload({
    consent: true,
    email: '  Person@Example.COM ',
    firstName: ' Daniela ',
    flow: 'audio',
    ignored: 'not persisted',
    quizAnswers: ['quiet', 'clear'],
    resultSignal: 'clear',
  });

  assert.equal(lead?.email, 'person@example.com');
  assert.equal(lead?.firstName, 'Daniela');
  assert.deepEqual(lead?.quizAnswers, ['quiet', 'clear']);
  assert.equal('ignored' in (lead ?? {}), false);
  assert.equal(normalizeLeadPayload({ consent: false, email: 'a@example.com', flow: 'audio' }), null);
  assert.equal(normalizeLeadPayload({ consent: true, email: 'a@example.com', flow: 'other' }), null);
});

test('allows only same-origin requests by default or an explicit origin allowlist', () => {
  const sameOrigin = new Request('https://example.com/api/leads', { headers: { Origin: 'https://example.com' } });
  const differentOrigin = new Request('https://example.com/api/leads', { headers: { Origin: 'https://other.example' } });
  assert.equal(requestOriginIsAllowed(sameOrigin, undefined), true);
  assert.equal(requestOriginIsAllowed(differentOrigin, undefined), false);
  assert.equal(requestOriginIsAllowed(differentOrigin, 'https://other.example'), true);
});

test('rejects malformed, oversized, and non-consenting submissions before integrations run', async () => {
  let integrationCalled = false;
  globalThis.fetch = (async () => {
    integrationCalled = true;
    return new Response(null, { status: 204 });
  }) as typeof fetch;

  assert.equal((await POST(leadRequest({ consent: true, email: 'invalid', flow: 'audio' }))).status, 400);
  assert.equal((await POST(leadRequest({ consent: false, email: 'person@example.com', flow: 'waitlist' }))).status, 400);
  assert.equal((await POST(leadRequest({ consent: true, email: 'person@example.com', firstName: 'x'.repeat(20_000), flow: 'audio' }))).status, 413);
  assert.equal(integrationCalled, false);
});

test('treats a honeypot submission as accepted without calling integrations', async () => {
  let integrationCalled = false;
  globalThis.fetch = (async () => {
    integrationCalled = true;
    return new Response(null, { status: 204 });
  }) as typeof fetch;

  const response = await POST(leadRequest({
    company: 'spam',
    consent: true,
    email: 'person@example.com',
    flow: 'waitlist',
  }));
  assert.equal(response.status, 204);
  assert.equal(integrationCalled, false);
});

test('persists, subscribes, and sends an audio lead through server-side integrations', async () => {
  configureIntegration();
  const calls: string[] = [];
  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url.includes('/rest/v1/waitlist_leads?')) {
      return Response.json([{ email_sent_at: null, id: '00000000-0000-0000-0000-000000000001' }]);
    }
    return new Response(null, { status: url.includes('/rest/v1/waitlist_leads?id=') ? 204 : 201 });
  };

  const response = await POST(leadRequest({
    consent: true,
    email: 'person@example.com',
    firstName: 'Person',
    flow: 'audio',
  }));

  assert.equal(response.status, 200);
  assert.deepEqual(calls, [
    'https://project.supabase.co/rest/v1/waitlist_leads?on_conflict=email,flow',
    'https://api.brevo.com/v3/contacts',
    'https://api.brevo.com/v3/smtp/email',
    'https://project.supabase.co/rest/v1/waitlist_leads?id=eq.00000000-0000-0000-0000-000000000001',
  ]);
});

test('persists a waitlist lead and sends the branded confirmation once', async () => {
  const origin = 'https://waitlist.danielaion.com';
  configureIntegration(origin);
  const calls: string[] = [];
  let emailPayload: Record<string, unknown> | undefined;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    calls.push(url);
    if (url.includes('/rest/v1/waitlist_leads?')) {
      return Response.json([{ email_sent_at: null, id: '00000000-0000-0000-0000-000000000002' }]);
    }
    if (url.includes('/v3/smtp/email')) emailPayload = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(null, { status: url.includes('/rest/v1/waitlist_leads?id=') ? 204 : 201 });
  };

  const response = await POST(leadRequest({
    consent: true,
    email: 'person@example.com',
    firstName: 'Person',
    flow: 'waitlist',
    waitlistVersion: 'v3',
  }, origin));

  assert.equal(response.status, 200);
  assert.deepEqual(calls, [
    'https://project.supabase.co/rest/v1/waitlist_leads?on_conflict=email,flow',
    'https://api.brevo.com/v3/contacts',
    'https://api.brevo.com/v3/smtp/email',
    'https://project.supabase.co/rest/v1/waitlist_leads?id=eq.00000000-0000-0000-0000-000000000002',
  ]);
  assert.deepEqual(emailPayload?.sender, { email: 'hello@danielaion.com', name: 'Daniela Ion' });
  assert.equal(emailPayload?.subject, 'You’re on the Soul Portal waitlist');
  assert.match(String(emailPayload?.htmlContent), /Hi Person,/);
});
