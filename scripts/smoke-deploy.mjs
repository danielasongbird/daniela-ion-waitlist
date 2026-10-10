import { validateProductionHealthUrl } from './check-deploy-target.mjs';

const healthUrl = process.env.PRODUCTION_HEALTH_URL?.trim();
const expectedRevision = process.env.DEPLOY_REVISION?.trim();

if (!healthUrl || !expectedRevision) throw new Error('Smoke check requires PRODUCTION_HEALTH_URL and DEPLOY_REVISION.');
validateProductionHealthUrl(healthUrl);
const url = new URL(healthUrl);

const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15_000) });
if (!response.ok) throw new Error(`Production health endpoint returned HTTP ${response.status}.`);
const payload = await response.json();
if (payload.ok !== true || payload.service !== 'soul-portal' || payload.revision !== expectedRevision) {
  throw new Error('Production health endpoint did not report the deployed Git revision.');
}

console.log(`Production liveness confirmed for revision ${expectedRevision}.`);
