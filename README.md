# Soul Portal website

Frontend for Daniela's Soul Portal, Edge Activation sales flow, and welcome pages. It runs on vinext and is configured for Cloudflare Workers.

## Local development

Requires Node.js 22.13 or newer.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3011/`. Replace the example values in `.env.local`; never commit secrets.

## Environment

- `ALLOWED_ORIGINS`: comma-separated site origins allowed to post to `/api/leads`.
- `SUPABASE_URL` and `SUPABASE_SECRET_KEY`: server-only access to the existing `waitlist_leads` table. Apply the included migration only after the mapped Supabase project has been verified.
- `BREVO_API_KEY`, `BREVO_AUDIO_LIST_ID`, and `BREVO_WAITLIST_LIST_ID`: server-only contact synchronization settings.
- `BREVO_AUDIO_TEMPLATE_ID` and `SOUL_AUDIO_URL`: delivery settings for the homepage audio flow.
- `BREVO_SENDER_EMAIL` and `BREVO_REPLY_TO_EMAIL` (optional): sender overrides for the branded waitlist confirmation.
- `NEXT_PUBLIC_EDGE_CHECKOUT_URL` (required for live sales): hosted Edge Activation checkout URL. Falls back to the existing `#checkout` anchor when absent.
- `NEXT_PUBLIC_SOUL_PORTAL_URL` (required for live access): Soul Portal destination. Falls back to the existing `#soul-portal` anchor when absent.
- `NEXT_PUBLIC_SITE_URL` (recommended): canonical public website origin.

Lead submissions are stored in Supabase, synchronized to the appropriate Brevo list, and sent either the audio email or the branded waitlist confirmation. Checkout, payment webhooks, authentication, and portal entitlements remain external dependencies; this repository only links to their configured public URLs.

Before production, protect `/api/leads` with an edge rate limit and confirm the lawful email-consent wording for the homepage activation form. The waitlist modal already requires explicit consent.

`npm run deploy` deploys an existing `dist/server/wrangler.json`; it does not rebuild. Run the production configuration check and `npm run build` first. The server-only Supabase and Brevo values belong on the existing Cloudflare Worker. They are not GitHub Actions secrets and must be verified separately before launch.

## Checks

```powershell
npm test
npm run lint
npm run build
```

Pull requests and pushes to `main` run the same checks in GitHub Actions.

## Production deployment preparation

The production workflow is intentionally paused. It can only run in `danielasongbird/daniela-ion-waitlist` on `main`, and its entire job is skipped unless the repository variable `DEPLOY_ENABLED` is exactly `true`. Leave that variable absent until the workflow, target contract, existing service configuration, and database baseline have all been reviewed and an initial run is explicitly approved.

The checked-in target is:

- Cloudflare account `550a79065cd03aac65b870f5ab52395b`, Worker `soul-portal`
- Supabase project `znloinhypzmhlslghecn`
- Existing-schema baseline migration `202608310001`

Before enabling deployment, complete these steps in order:

1. Confirm the GitHub repository membership and production service accounts against the project account map. The repository is public, so review every tracked file before publishing it.
2. Reconfirm the reviewed Cloudflare target contract before deployment: `workers.dev` and preview URLs are disabled, the compatibility date is `2026-09-01` with `nodejs_compat`, cache is enabled, and the binding inventory contains the `ASSETS` binding plus the five named runtime secrets. Routes remain absent from the generated Wrangler config so this workflow does not manage `danielaion.com`, `waitlist.danielaion.com`, or any other route. The live API preflight compares the reviewed settings and binding names/types without logging binding values.
3. Verify the existing Cloudflare Worker holds every required runtime Supabase and Brevo setting. The current Worker has the five bindings recorded in the target contract, but the combined homepage audio flow is still missing `BREVO_AUDIO_TEMPLATE_ID` and `SOUL_AUDIO_URL`. Their exact values are unresolved; configure them only through a separate approved Cloudflare step, then refresh the reviewed binding inventory. The preflight blocks before migrations while either name is absent. Do not copy runtime values into GitHub. `keep_vars` preserves undeclared plain-text/JSON variables, while existing Worker secrets remain managed in Cloudflare. Any other binding type must be represented exactly by the generated configuration before enabling deployment.
4. Configure these GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `SUPABASE_ACCESS_TOKEN`, and `SUPABASE_DB_PASSWORD`. Scope each credential to the mapped account and resource.
5. Configure these GitHub Actions variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_EDGE_CHECKOUT_URL`, `NEXT_PUBLIC_SOUL_PORTAL_URL`, and `PRODUCTION_HEALTH_URL`. The health URL must be exactly `/api/health` on `danielaion.com` or `waitlist.danielaion.com`, with no credentials, custom port, query, or fragment. The exact checkout and membership destinations are still unmapped, so those variables are an open launch blocker.
6. Through a separate reviewed and approved operation, record migration `202608310001` as applied in the remote Supabase migration history. The remote schema already exists; do not apply the baseline SQL blindly. The workflow refuses to run `db push` unless the remote history lists that version.
7. Merge the reviewed workflow while `DEPLOY_ENABLED` remains absent. After explicit approval, set it to `true` and let Ana trigger the first `Deploy production` run manually.

The workflow installs pinned tools, runs tests, lint, type checking, the existing production URL check, a production build, target checks, a read-only Cloudflare settings check, a Wrangler dry run, the Supabase baseline check, and a Supabase migration dry run before any production mutation. It then applies pending migrations, deploys that same already-built Worker and site, and calls `/api/health` to verify the exact Git commit. The health endpoint reports process liveness and revision only; it does not claim that the database or email delivery is healthy.

Deployment is not atomic across Supabase and Cloudflare. If database migrations succeed and the Worker deployment or smoke check later fails, the migrations remain applied. Stop, diagnose the failed stage, and redeploy the same reviewed revision or prepare a separately reviewed forward migration; there is no automatic cross-platform rollback.
