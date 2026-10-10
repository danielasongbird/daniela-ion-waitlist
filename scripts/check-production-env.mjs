import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

for (const file of ['.env.production.local', '.env.production', '.env.local', '.env']) {
  if (existsSync(file)) loadEnvFile(file);
}

const requiredPublicUrls = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_EDGE_CHECKOUT_URL',
  'NEXT_PUBLIC_SOUL_PORTAL_URL',
];

const failures = [];

for (const name of requiredPublicUrls) {
  const value = process.env[name]?.trim();
  if (!value) {
    failures.push(`${name} is missing`);
    continue;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') failures.push(`${name} must use HTTPS`);
    const placeholderHost = url.hostname === 'localhost'
      || url.hostname === 'example.com'
      || url.hostname.endsWith('.example.com')
      || url.hostname.endsWith('.invalid')
      || url.hostname.endsWith('.test');
    if (placeholderHost) {
      failures.push(`${name} still points to a local or placeholder domain`);
    }
  } catch {
    failures.push(`${name} is not a valid absolute URL`);
  }
}

if (failures.length) {
  console.error('Production configuration is not ready:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Production public URLs are configured.');
