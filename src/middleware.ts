import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const host = context.request.headers.get('host') ?? '';
  const { pathname } = new URL(context.request.url);

  if (host === 'afirmaciones.cynponceglz.com') {
    if (pathname === '/') return context.rewrite('/afirmaciones');
    if (pathname === '/gracias') return context.rewrite('/afirmaciones/gracias');
  }

  if (host === 'lectoescritura.cynponceglz.com') {
    if (pathname === '/') return context.rewrite('/lectoescritura');
    if (pathname === '/gracias') return context.rewrite('/lectoescritura/gracias');
  }

  return next();
});
