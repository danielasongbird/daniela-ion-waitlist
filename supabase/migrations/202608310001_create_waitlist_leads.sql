create table if not exists public.waitlist_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email = lower(email)),
  first_name text,
  flow text not null check (flow in ('audio', 'waitlist')),
  consent boolean not null default false,
  consent_at timestamptz,
  consent_source text,
  landing_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  waitlist_version text,
  quiz_answers jsonb,
  result_signal text check (result_signal is null or result_signal in ('quiet', 'clear', 'ready')),
  brevo_contact_synced_at timestamptz,
  email_sent_at timestamptz,
  delivery_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email, flow)
);

alter table public.waitlist_leads enable row level security;
revoke all on table public.waitlist_leads from anon, authenticated;

create index if not exists waitlist_leads_created_at_idx on public.waitlist_leads (created_at desc);
create index if not exists waitlist_leads_flow_idx on public.waitlist_leads (flow);
