import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const host = url.hostname;
  const path = url.pathname;

  if (path !== "/" && path !== "/gracias") {
    return next();
  }

  if (host === "afirmaciones.cynponceglz.com") {
    if (path === "/") {
      return context.rewrite("/afirmaciones");
    }
    if (path === "/gracias") {
      return context.rewrite("/afirmaciones/gracias" + url.search);
    }
  }

  if (host === "lectoescritura.cynponceglz.com") {
    if (path === "/") {
      return context.rewrite("/lectoescritura");
    }
    if (path === "/gracias") {
      return context.rewrite("/lectoescritura/gracias" + url.search);
    }
  }

  return next();
});
