'use client';

import type { LeadFlow } from './leadCapture';

type SubmitLeadInput = {
  company?: string;
  consent: boolean;
  email: string;
  firstName?: string;
  flow: LeadFlow;
  quizAnswers?: string[];
  resultSignal?: 'quiet' | 'clear' | 'ready';
  waitlistVersion?: string;
};

type SubmitLeadResponse = {
  message?: string;
  ok?: boolean;
};

function attribution() {
  const query = new URLSearchParams(window.location.search);
  return {
    landingPath: window.location.pathname,
    utmCampaign: query.get('utm_campaign'),
    utmMedium: query.get('utm_medium'),
    utmSource: query.get('utm_source'),
  };
}

export async function submitLead(input: SubmitLeadInput): Promise<void> {
  const response = await fetch('/api/leads', {
    body: JSON.stringify({ ...input, ...attribution() }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  let result: SubmitLeadResponse | undefined;
  try {
    result = await response.json() as SubmitLeadResponse;
  } catch {
    // The status code remains authoritative if an intermediary returns non-JSON.
  }

  if (!response.ok || result?.ok === false) {
    throw new Error(result?.message ?? 'We could not save your details. Please try again.');
  }
}
