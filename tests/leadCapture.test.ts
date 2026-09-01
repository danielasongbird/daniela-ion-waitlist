import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeLeadPayload, requestOriginIsAllowed } from '../app/lib/leadCapture.ts';
import { POST } from '../app/api/leads/route.ts';

test('normalizes a valid lead without retaining excess input', () => {
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
});

test('rejects invalid email, missing consent, and unknown flows', () => {
  assert.equal(normalizeLeadPayload({ consent: true, email: 'invalid', flow: 'audio' }), null);
  assert.equal(normalizeLeadPayload({ consent: false, email: 'a@example.com', flow: 'audio' }), null);
  assert.equal(normalizeLeadPayload({ consent: true, email: 'a@example.com', flow: 'other' }), null);
});

test('accepts only a same-origin request by default', () => {
  const allowed = new Request('https://example.com/api/leads', { headers: { Origin: 'https://example.com' } });
  const denied = new Request('https://example.com/api/leads', { headers: { Origin: 'https://attacker.example' } });
  assert.equal(requestOriginIsAllowed(allowed, undefined), true);
  assert.equal(requestOriginIsAllowed(denied, undefined), false);
});

test('supports an explicit production origin allowlist', () => {
  const request = new Request('https://worker.example/api/leads', { headers: { Origin: 'https://www.example.com' } });
  assert.equal(requestOriginIsAllowed(request, 'https://example.com, https://www.example.com'), true);
});

test('persists, subscribes, and sends an audio lead through server-side integrations', async () => {
  const originalFetch = fetch;
  const originalEnvironment = {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_AUDIO_LIST_ID: process.env.BREVO_AUDIO_LIST_ID,
    BREVO_AUDIO_TEMPLATE_ID: process.env.BREVO_AUDIO_TEMPLATE_ID,
    BREVO_WAITLIST_TEMPLATE_ID: process.env.BREVO_WAITLIST_TEMPLATE_ID,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  };
  const calls: string[] = [];

  process.env.ALLOWED_ORIGINS = 'https://example.com';
  process.env.BREVO_API_KEY = 'test-key';
  process.env.BREVO_AUDIO_LIST_ID = '12';
  process.env.BREVO_AUDIO_TEMPLATE_ID = '34';
  process.env.SUPABASE_SECRET_KEY = 'test-secret-key';
  process.env.SUPABASE_URL = 'https://project.supabase.co';

  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url.includes('/rest/v1/waitlist_leads?')) {
      return Response.json([{ email_sent_at: null, id: '00000000-0000-0000-0000-000000000001' }]);
    }
    return new Response(null, { status: url.includes('/rest/v1/waitlist_leads?id=') ? 204 : 201 });
  };

  try {
    const response = await POST(new Request('https://example.com/api/leads', {
      body: JSON.stringify({ consent: true, email: 'person@example.com', firstName: 'Person', flow: 'audio' }),
      headers: { 'Content-Type': 'application/json', Origin: 'https://example.com' },
      method: 'POST',
    }));

    assert.equal(response.status, 200);
    assert.deepEqual(calls, [
      'https://project.supabase.co/rest/v1/waitlist_leads?on_conflict=email,flow',
      'https://api.brevo.com/v3/contacts',
      'https://api.brevo.com/v3/smtp/email',
      'https://project.supabase.co/rest/v1/waitlist_leads?id=eq.00000000-0000-0000-0000-000000000001',
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    Object.entries(originalEnvironment).forEach(([key, value]) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});

test('subscribes and sends a configured waitlist confirmation once', async () => {
  const originalFetch = fetch;
  const originalEnvironment = {
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_WAITLIST_LIST_ID: process.env.BREVO_WAITLIST_LIST_ID,
    BREVO_WAITLIST_TEMPLATE_ID: process.env.BREVO_WAITLIST_TEMPLATE_ID,
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  };
  const calls: string[] = [];

  process.env.ALLOWED_ORIGINS = 'https://waitlist.danielaion.com';
  process.env.BREVO_API_KEY = 'test-key';
  process.env.BREVO_WAITLIST_LIST_ID = '7';
  process.env.BREVO_WAITLIST_TEMPLATE_ID = '42';
  process.env.SUPABASE_SECRET_KEY = 'test-secret-key';
  process.env.SUPABASE_URL = 'https://project.supabase.co';

  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url.includes('/rest/v1/waitlist_leads?')) {
      return Response.json([{ email_sent_at: null, id: '00000000-0000-0000-0000-000000000002' }]);
    }
    return new Response(null, { status: url.includes('/rest/v1/waitlist_leads?id=') ? 204 : 201 });
  };

  try {
    const response = await POST(new Request('https://waitlist.danielaion.com/api/leads', {
      body: JSON.stringify({ consent: true, email: 'person@example.com', firstName: 'Person', flow: 'waitlist' }),
      headers: { 'Content-Type': 'application/json', Origin: 'https://waitlist.danielaion.com' },
      method: 'POST',
    }));

    assert.equal(response.status, 200);
    assert.deepEqual(calls, [
      'https://project.supabase.co/rest/v1/waitlist_leads?on_conflict=email,flow',
      'https://api.brevo.com/v3/contacts',
      'https://api.brevo.com/v3/smtp/email',
      'https://project.supabase.co/rest/v1/waitlist_leads?id=eq.00000000-0000-0000-0000-000000000002',
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    Object.entries(originalEnvironment).forEach(([key, value]) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  }
});
