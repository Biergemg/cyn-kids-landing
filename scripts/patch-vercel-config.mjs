import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// Remove _middleware.func if Vercel's build cache injected it from a prior build.
// With edgeMiddleware: false, Astro does not generate _middleware.func in a clean build,
// but Vercel may reuse a cached artifact. Deleting it here ensures POST requests
// reach _render.func directly with the correct method.
const middlewareFunc = join('.vercel', 'output', 'functions', '_middleware.func');
if (existsSync(middlewareFunc)) {
  rmSync(middlewareFunc, { recursive: true, force: true });
  console.log('[patch] Deleted _middleware.func — edge middleware removed to fix POST method stripping');
} else {
  console.log('[patch] _middleware.func not present — no action needed');
}
