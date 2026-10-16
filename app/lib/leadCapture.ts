export type LeadFlow = 'audio' | 'waitlist';

export type LeadPayload = {
  company: string;
  consent: boolean;
  email: string;
  firstName: string | null;
  flow: LeadFlow;
  landingPath: string | null;
  quizAnswers: string[] | null;
  resultSignal: 'quiet' | 'clear' | 'ready' | null;
  utmCampaign: string | null;
  utmMedium: string | null;
  utmSource: string | null;
  waitlistVersion: string | null;
};

type UnknownRecord = Record<string, unknown>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESULT_SIGNALS = new Set(['quiet', 'clear', 'ready']);

function stringValue(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}

function booleanValue(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === '1';
}

function stringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const normalized = value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim().slice(0, 32))
    .filter(Boolean)
    .slice(0, 10);
  return normalized.length ? normalized : null;
}

export function normalizeLeadPayload(input: unknown): LeadPayload | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const record = input as UnknownRecord;
  const flow = record.flow === 'audio' || record.flow === 'waitlist' ? record.flow : null;
  const email = stringValue(record.email, 254)?.toLowerCase() ?? null;

  if (!flow || !email || !EMAIL_PATTERN.test(email) || !booleanValue(record.consent)) return null;

  const resultSignal = typeof record.resultSignal === 'string' && RESULT_SIGNALS.has(record.resultSignal)
    ? record.resultSignal as LeadPayload['resultSignal']
    : null;

  return {
    company: stringValue(record.company, 120) ?? '',
    consent: true,
    email,
    firstName: stringValue(record.firstName ?? record.name, 100),
    flow,
    landingPath: stringValue(record.landingPath, 500),
    quizAnswers: stringArray(record.quizAnswers),
    resultSignal,
    utmCampaign: stringValue(record.utmCampaign ?? record.utm_campaign, 200),
    utmMedium: stringValue(record.utmMedium ?? record.utm_medium, 200),
    utmSource: stringValue(record.utmSource ?? record.utm_source, 200),
    waitlistVersion: stringValue(record.waitlistVersion ?? record.waitlist_version, 50),
  };
}

export function requestOriginIsAllowed(request: Request, configuredOrigins: string | undefined): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  const allowedOrigins = (configuredOrigins ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowedOrigins.length) return allowedOrigins.includes(origin);
  return origin === new URL(request.url).origin;
}
