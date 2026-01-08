import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://cynkids.com', // Placeholder, user can update
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404') &&
        !page.includes('/privado')
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
