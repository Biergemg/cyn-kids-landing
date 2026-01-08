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
  ]
});
