import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertBaselineRecorded,
  bindingSignatures,
  missingRequiredRuntimeBindings,
  remoteMigrationVersions,
  unsupportedLiveBindings,
  validateGeneratedConfig,
} from './check-deploy-target.mjs';

const reviewedTarget = {
  cloudflare: {
    accountId: '550a79065cd03aac65b870f5ab52395b',
    bindings: [],
    cacheEnabled: true,
    compatibilityDate: '2026-09-01',
    compatibilityFlags: ['nodejs_compat'],
    previewUrls: false,
    settingsReviewed: true,
    workerName: 'soul-portal',
    workersDev: true,
  },
};

const generatedConfig = {
  account_id: '550a79065cd03aac65b870f5ab52395b',
  assets: { directory: '../client' },
  cache: { enabled: true },
  compatibility_date: '2026-09-01',
  compatibility_flags: ['nodejs_compat'],
  keep_vars: true,
  name: 'soul-portal',
  preview_urls: false,
  vars: { DEPLOY_REVISION: 'abc123' },
  workers_dev: true,
};

const deployEnvironment = {
  DEPLOY_REVISION: 'abc123',
  PRODUCTION_HEALTH_URL: 'https://waitlist.danielaion.com/api/health',
};

test('reads only remote versions from Supabase migration list output', () => {
  const output = `
   LOCAL        │ REMOTE       │ TIME (UTC)
  ──────────────┼──────────────┼──────────────────────
   202608310001 │ 202608310001 │ 2026-08-31 00:01:00
   202609010001 │              │ 2026-09-01 00:01:00
                │ 202607010001 │ 2026-07-01 00:01:00
  `;
  assert.deepEqual([...remoteMigrationVersions(output)], ['202608310001', '202607010001']);
});

test('fails closed when the existing-schema baseline is absent remotely', () => {
  assert.throws(
    () => assertBaselineRecorded('202608310001 │                │ 2026-08-31 00:01:00', '202608310001'),
    /separately approved migration repair/,
  );
});

test('normalizes Cloudflare bindings without retaining values', () => {
  assert.deepEqual(
    bindingSignatures([
      { name: 'BETA', type: 'secret_text', text: 'do-not-retain' },
      { name: 'ALPHA', type: 'plain_text', text: 'do-not-retain' },
    ]),
    [
      { name: 'ALPHA', type: 'plain_text' },
      { name: 'BETA', type: 'secret_text' },
    ],
  );
});

test('accepts a generated deploy config that exactly matches a reviewed fixture', () => {
  assert.doesNotThrow(() => validateGeneratedConfig(generatedConfig, reviewedTarget, deployEnvironment));
});

test('fails generated deploy validation while live Cloudflare settings are unreviewed', () => {
  const unreviewedTarget = {
    ...reviewedTarget,
    cloudflare: { ...reviewedTarget.cloudflare, settingsReviewed: false },
  };
  assert.throws(
    () => validateGeneratedConfig(generatedConfig, unreviewedTarget, deployEnvironment),
    /live Cloudflare settings have not been reviewed/,
  );
});

test('fails when the generated revision differs from the intended commit', () => {
  assert.throws(
    () => validateGeneratedConfig(generatedConfig, reviewedTarget, {
      ...deployEnvironment,
      DEPLOY_REVISION: 'different',
    }),
    /DEPLOY_REVISION does not match/,
  );
});

test('rejects a health check outside the approved production origins', () => {
  assert.throws(
    () => validateGeneratedConfig(generatedConfig, reviewedTarget, {
      ...deployEnvironment,
      PRODUCTION_HEALTH_URL: 'https://unrelated.example/api/health?revision=abc123',
    }),
    /approved production HTTPS origin/,
  );
});

test('rejects non-variable bindings unless the exact generated asset binding preserves them', () => {
  const live = [
    { name: 'BREVO_API_KEY', type: 'secret_text' },
    { name: 'CACHE', type: 'kv_namespace' },
    { name: 'ASSETS', type: 'assets' },
  ];
  assert.deepEqual(unsupportedLiveBindings(live, { assets: { directory: '../client' } }), [
    { name: 'ASSETS', type: 'assets' },
    { name: 'CACHE', type: 'kv_namespace' },
  ]);
  assert.deepEqual(unsupportedLiveBindings(live, {
    assets: { binding: 'ASSETS', directory: '../client' },
  }), [{ name: 'CACHE', type: 'kv_namespace' }]);
});

test('requires both combined-site audio bindings before production mutations', () => {
  assert.deepEqual(missingRequiredRuntimeBindings([
    { name: 'BREVO_AUDIO_TEMPLATE_ID', type: 'secret_text' },
  ]), ['SOUL_AUDIO_URL']);
  assert.deepEqual(missingRequiredRuntimeBindings([
    { name: 'SOUL_AUDIO_URL', type: 'plain_text' },
    { name: 'BREVO_AUDIO_TEMPLATE_ID', type: 'secret_text' },
  ]), []);
});

