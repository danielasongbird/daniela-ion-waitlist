import tailwindcss from '@tailwindcss/postcss';
import { readFileSync } from 'node:fs';
import vinext from 'vinext';
import { defineConfig } from 'vite';

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';
const deployTarget = JSON.parse(
  readFileSync(new URL('./.github/deploy-target.json', import.meta.url), 'utf8'),
) as {
  cloudflare: {
    previewUrls: boolean | null;
    settingsReviewed: boolean;
    workersDev: boolean | null;
  };
};
if (deployTarget.cloudflare.settingsReviewed
    && (typeof deployTarget.cloudflare.workersDev !== 'boolean'
      || typeof deployTarget.cloudflare.previewUrls !== 'boolean')) {
  throw new Error('Reviewed Cloudflare subdomain settings must be booleans.');
}
const reviewedSubdomainSettings: { preview_urls?: boolean; workers_dev?: boolean } =
  deployTarget.cloudflare.settingsReviewed
    ? {
        preview_urls: deployTarget.cloudflare.previewUrls as boolean,
        workers_dev: deployTarget.cloudflare.workersDev as boolean,
      }
    : {};

const cloudflareConfig = {
  account_id: '550a79065cd03aac65b870f5ab52395b',
  name: 'soul-portal',
  main: 'vinext/server/app-router-entry',
  compatibility_date: '2026-09-01',
  compatibility_flags: ['nodejs_compat'],
  assets: { binding: 'ASSETS' },
  cache: { enabled: true },
  keep_vars: true,
  vars: {
    DEPLOY_REVISION: process.env.DEPLOY_REVISION ?? 'local',
  },
  ...reviewedSubdomainSettings,
};

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: cloudflareConfig,
      }),
    ],
  };
});
