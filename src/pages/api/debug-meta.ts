export const prerender = false;

// Endpoint temporal de diagnóstico — eliminar después de confirmar variables
// Acceso: /api/debug-meta
export function GET() {
  const pixelId    = import.meta.env.FB_PIXEL_ID;
  const token      = import.meta.env.FB_ACCESS_TOKEN;
  const testCode   = import.meta.env.FB_TEST_EVENT_CODE;

  return new Response(JSON.stringify({
    FB_PIXEL_ID:          pixelId    ? `${pixelId}` : 'MISSING',
    FB_ACCESS_TOKEN:      token      ? `set (${token.slice(0, 6)}…)` : 'MISSING',
    FB_TEST_EVENT_CODE:   testCode   ? testCode : 'MISSING',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
