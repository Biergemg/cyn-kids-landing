import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const configPath = resolve('.vercel/output/config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

// Insert middleware route before "handle: filesystem" so edge middleware
// intercepts ALL requests (including static files) before Vercel serves them.
const filesystemIdx = config.routes.findIndex(r => r.handle === 'filesystem');

if (filesystemIdx === -1) {
  console.log('[patch] No "handle: filesystem" found — skipping');
  process.exit(0);
}

const middlewareRoute = {
  src: '/(.*)',
  middlewarePath: '_middleware',
  continue: true,
};

// Check if already patched
const alreadyPatched = config.routes.some(r => r.middlewarePath === '_middleware');
if (alreadyPatched) {
  console.log('[patch] Already patched — skipping');
  process.exit(0);
}

config.routes.splice(filesystemIdx, 0, middlewareRoute);
writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('[patch] Inserted middleware route before filesystem handler');
