import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import { cdnAdapter } from '@vinext/cloudflare/cache/cdn-adapter';
import { cloudflare } from '@cloudflare/vite-plugin';

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext({
        cache: { cdn: cdnAdapter() },
      }),
      cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
      }),
    ],
  };
});
