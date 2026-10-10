import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const TARGET_PATH = new URL('../.github/deploy-target.json', import.meta.url);
const GENERATED_CONFIG_PATH = new URL('../dist/server/wrangler.json', import.meta.url);

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sortedStrings(values) {
  return [...values].sort((left, right) => left.localeCompare(right));
}

export function bindingSignatures(bindings = []) {
  return bindings
    .map((binding) => ({ name: binding.name, type: binding.type }))
    .sort((left, right) => `${left.name}:${left.type}`.localeCompare(`${right.name}:${right.type}`));
}

export function validateProductionHealthUrl(value) {
  if (!value) throw new Error('PRODUCTION_HEALTH_URL is required before production mutations.');
  const url = new URL(value);
  const approvedHosts = new Set(['danielaion.com', 'waitlist.danielaion.com']);
  if (url.protocol !== 'https:'
      || !approvedHosts.has(url.hostname)
      || url.port
      || url.username
      || url.password
      || url.pathname !== '/api/health'
      || url.search
      || url.hash) {
    throw new Error('PRODUCTION_HEALTH_URL must be an approved production HTTPS origin plus /api/health.');
  }
}

export function unsupportedLiveBindings(bindings, generated) {
  const preservedVariableTypes = new Set(['plain_text', 'json', 'secret_text']);
  return bindingSignatures(bindings).filter((binding) => {
    if (preservedVariableTypes.has(binding.type)) return false;
    return binding.type !== 'assets'
      || typeof generated.assets?.binding !== 'string'
      || binding.name !== generated.assets.binding;
  });
}

export function missingRequiredRuntimeBindings(bindings) {
  const bindingNames = new Set(bindingSignatures(bindings).map((binding) => binding.name));
  return ['BREVO_AUDIO_TEMPLATE_ID', 'SOUL_AUDIO_URL'].filter((name) => !bindingNames.has(name));
}

export function remoteMigrationVersions(output) {
  const versions = new Set();
  const plainOutput = output.replaceAll(/\u001b\[[0-9;]*m/g, '');

  for (const line of plainOutput.split(/\r?\n/)) {
    const columns = line.split(/[│|]/).map((column) => column.trim());
    if (columns.length < 2) continue;
    const remote = columns[1];
    if (/^\d{12,14}$/.test(remote)) versions.add(remote);
  }

  return versions;
}

export function assertBaselineRecorded(output, baseline) {
  const remoteVersions = remoteMigrationVersions(output);
  if (!remoteVersions.has(baseline)) {
    throw new Error(
      `Remote migration history does not record baseline ${baseline}. `
      + 'Stop: the existing schema must be baselined through a separately approved migration repair before db push.',
    );
  }
}

async function readJson(url) {
  return JSON.parse(await readFile(url, 'utf8'));
}

async function loadTarget() {
  const target = await readJson(TARGET_PATH);
  if (target.repository !== 'danielasongbird/daniela-ion-waitlist'
      || target.ref !== 'refs/heads/main'
      || target.cloudflare?.accountId !== '550a79065cd03aac65b870f5ab52395b'
      || target.cloudflare?.workerName !== 'soul-portal'
      || target.supabase?.projectRef !== 'znloinhypzmhlslghecn'
      || target.supabase?.baselineMigration !== '202608310001') {
    throw new Error('The checked-in deployment target contract does not match the approved production targets.');
  }
  return target;
}

export function validateGeneratedConfig(config, target, environment = process.env) {
  const expectedRevision = environment.DEPLOY_REVISION?.trim();
  const failures = [];

  if (config.account_id !== target.cloudflare.accountId) failures.push('account_id does not match');
  if (config.name !== target.cloudflare.workerName) failures.push('Worker name does not match');
  if (config.keep_vars !== true) failures.push('keep_vars is not enabled');
  if (config.routes !== undefined || config.route !== undefined) failures.push('routes must remain unmanaged');
  if (target.cloudflare.settingsReviewed !== true) {
    failures.push('live Cloudflare settings have not been reviewed');
  } else if (config.workers_dev !== target.cloudflare.workersDev
      || config.preview_urls !== target.cloudflare.previewUrls) {
    failures.push('workers_dev or preview_urls differs from the reviewed live setting');
  }
  if (config.compatibility_date !== target.cloudflare.compatibilityDate
      || !sameJson(
        sortedStrings(config.compatibility_flags ?? []),
        sortedStrings(target.cloudflare.compatibilityFlags ?? []),
      )) {
    failures.push('generated compatibility date or flags differ from the reviewed live settings');
  }
  if (config.cache?.enabled !== target.cloudflare.cacheEnabled) {
    failures.push('generated cache setting differs from the reviewed live setting');
  }
  if (!expectedRevision || config.vars?.DEPLOY_REVISION !== expectedRevision) {
    failures.push('DEPLOY_REVISION does not match the intended Git commit');
  }

  if (!sameJson(Object.keys(config.vars ?? {}).sort(), ['DEPLOY_REVISION'])) {
    failures.push('generated config must only manage the DEPLOY_REVISION plain-text variable');
  }
  try {
    validateProductionHealthUrl(environment.PRODUCTION_HEALTH_URL?.trim());
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }

  if (failures.length) throw new Error(`Generated Wrangler config failed target checks:\n- ${failures.join('\n- ')}`);
}

async function checkGeneratedConfig(target) {
  const config = await readJson(GENERATED_CONFIG_PATH);
  validateGeneratedConfig(config, target);
  console.log('Generated Wrangler config matches the approved target and revision.');
}

async function checkCloudflare(target) {
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN is required for the read-only Cloudflare preflight.');

  const { accountId, workerName } = target.cloudflare;
  const request = async (path) => {
    const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      redirect: 'error',
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`Cloudflare settings preflight failed with HTTP ${response.status}.`);
    const payload = await response.json();
    if (!payload.success || !payload.result) throw new Error('Cloudflare did not return the target Worker settings.');
    return payload.result;
  };

  const [settings, subdomain] = await Promise.all([
    request(`/accounts/${accountId}/workers/scripts/${workerName}/settings`),
    request(`/accounts/${accountId}/workers/services/${workerName}/environments/production/subdomain`),
  ]);

  const reviewed = target.cloudflare;
  if (reviewed.settingsReviewed !== true
      || typeof reviewed.workersDev !== 'boolean'
      || typeof reviewed.previewUrls !== 'boolean'
      || typeof reviewed.cacheEnabled !== 'boolean'
      || typeof reviewed.compatibilityDate !== 'string'
      || !Array.isArray(reviewed.compatibilityFlags)
      || !Array.isArray(reviewed.bindings)) {
    throw new Error(
      'Cloudflare deployment remains paused: record the reviewed live workers.dev/preview URL flags, '
      + 'compatibility settings, and binding name/type inventory in .github/deploy-target.json.',
    );
  }

  const actualFlags = sortedStrings(settings.compatibility_flags ?? []);
  const expectedFlags = sortedStrings(reviewed.compatibilityFlags);
  const ignoreRevision = (binding) => binding.name !== 'DEPLOY_REVISION';
  const actualBindings = bindingSignatures(settings.bindings ?? []).filter(ignoreRevision);
  const expectedBindings = bindingSignatures(reviewed.bindings).filter(ignoreRevision);
  if (settings.compatibility_date !== reviewed.compatibilityDate
      || !sameJson(actualFlags, expectedFlags)
      || !sameJson(actualBindings, expectedBindings)
      || settings.cache_options?.enabled !== reviewed.cacheEnabled
      || subdomain.enabled !== reviewed.workersDev
      || subdomain.previews_enabled !== reviewed.previewUrls) {
    throw new Error(
      'Live Cloudflare subdomain flags, compatibility/cache settings, or binding names/types differ from the reviewed contract. '
      + 'No binding values were logged.',
    );
  }

  const generated = await readJson(GENERATED_CONFIG_PATH);
  const unsupported = unsupportedLiveBindings(actualBindings, generated);
  if (unsupported.length) {
    throw new Error(
      'Live Cloudflare has non-variable bindings that the generated config does not preserve. '
      + 'No binding values were logged.',
    );
  }

  const missingRuntimeBindings = missingRequiredRuntimeBindings(actualBindings);
  if (missingRuntimeBindings.length) {
    throw new Error(
      `Cloudflare is missing required combined-site runtime bindings: ${missingRuntimeBindings.join(', ')}. `
      + 'Configure them through a separately approved step, then refresh the reviewed binding inventory.',
    );
  }

  console.log('Live Cloudflare flags and binding name/type inventory match the reviewed contract.');
}

async function main() {
  const target = await loadTarget();
  const mode = process.argv[2];

  if (mode === 'generated') return checkGeneratedConfig(target);
  if (mode === 'cloudflare') return checkCloudflare(target);
  if (mode === 'migration') {
    let output = '';
    for await (const chunk of process.stdin) output += chunk;
    assertBaselineRecorded(output, target.supabase.baselineMigration);
    console.log(`Remote migration history records baseline ${target.supabase.baselineMigration}.`);
    return;
  }
  throw new Error('Usage: node scripts/check-deploy-target.mjs <generated|cloudflare|migration>');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
