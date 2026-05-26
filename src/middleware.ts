import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const host = context.request.headers.get('host') ?? '';

  if (host.startsWith('lectoescritura.')) {
    const path = new URL(context.request.url).pathname;
    if (path === '/gracias' || path === '/gracias/') {
      return context.rewrite('/lectoescritura/gracias');
    }
  }

  return next();
});
