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

  if (!response.ok) throw new Error('Lead submission failed');
}

