import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel({ edgeMiddleware: true }),
  site: 'https://einsteinkids.cynponceglz.com',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404') &&
        !page.includes('/privado') &&
        !page.includes('/gracias') &&
        !page.includes('/dl/')
    }),
    tailwind()
  ],
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Silenciar warning específico de Astro sobre imports no usados
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.source?.includes('@astrojs/internal-helpers')) return;
          warn(warning);
        }
      }
    }
  }
});
