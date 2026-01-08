🏗️ BLUEPRINT DEFINITIVO
Landing Elite de Afiliación (Producto Pediátrico – COFEPRIS Safe)
1. STACK TECNOLÓGICO (NO CAMBIAR)

Core

Astro 4.x (SSG only)

TypeScript strict

Tailwind CSS 3.x

Cloudflare Pages (Git deploy)

Principio

Landing ultra-rápida, cero backend, cero formularios obligatorios, cero checkout propio.

2. ESTRUCTURA DE DIRECTORIOS (FINAL)
/
├── astro.config.mjs
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
│
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og/
│   │   ├── og-default.png
│   │   └── og-landing.png
│   └── manifest.webmanifest
│
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│
│   ├── components/
│   │   ├── seo/
│   │   │   └── DynamicSEO.astro
│   │   ├── analytics/
│   │   │   └── Analytics.astro
│   │   ├── ui/
│   │   │   ├── ButtonCTA.astro
│   │   │   ├── Divider.astro
│   │   │   └── Badge.astro
│   │   └── legal/
│   │       └── Disclaimer.astro
│
│   ├── lib/
│   │   └── analytics/
│   │       ├── init.ts
│   │       ├── enrichVisitor.ts
│   │       ├── events/
│   │       │   ├── affiliateClick.ts
│   │       │   ├── scrollDepth.ts
│   │       │   └── highIntent.ts
│   │       └── performance/
│   │           └── webVitals.ts
│
│   └── pages/
│       ├── index.astro
│       └── 404.astro
│
└── README.md

3. SEO AUTOMATIZADO (OBLIGATORIO)
astro.config.mjs
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://tusitio.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404') &&
        !page.includes('/gracias') &&
        !page.includes('/privado')
    })
  ]
})

public/robots.txt
User-agent: *
Allow: /
Sitemap: https://tusitio.com/sitemap-index.xml

DynamicSEO.astro (CENTRALIZADO)

Incluye SIEMPRE:

canonical automático

OG

Twitter Card

JSON-LD

noindex boolean

---
const {
  title,
  description,
  image = '/og/og-default.png',
  noindex = false
} = Astro.props

const canonical = new URL(Astro.url.pathname, Astro.site).href
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />

{noindex && <meta name="robots" content="noindex, nofollow" />}

<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={image} />

<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marca del Proyecto",
  "url": Astro.site
})}
</script>

4. ANALYTICS ELITE (AFILIACIÓN-READY)
PRINCIPIO CLAVE

No trackeas purchases.
Trackeas intención y salida a checkout.

Evento CLAVE (OBLIGATORIO)

affiliate_checkout_click

Propiedades mínimas

product

position (hero / mid / footer)

destination_domain

affiliateClick.ts
export const trackAffiliateClick = (
  product: string,
  position: string,
  destination: string
) => {
  if (!window.gtag) return
  window.gtag('event', 'affiliate_checkout_click', {
    product,
    position,
    destination_domain: destination
  })
}

Analytics.astro (inyector)
<script type="module">
  import { initAnalytics } from '../lib/analytics/init'
  initAnalytics()
</script>

webVitals.ts

Reporta:

LCP

CLS

INP

Directo a GA4 como web_vital.

5. LAYOUT BASE (CON TODO)
BaseLayout.astro

Incluye:

SEO

Analytics

Favicons

Disclaimer visible

<!DOCTYPE html>
<html lang="es">
<head>
  <DynamicSEO {...Astro.props.seo} />
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <Analytics />
</head>
<body class="bg-white text-gray-900">
  <slot />
  <Disclaimer />
</body>
</html>

6. DISCLAIMER LEGAL (NO NEGOCIABLE)
Disclaimer.astro

Texto visible, no oculto, no agresivo:

“Esta página es informativa.
La compra se realiza exclusivamente en el sitio oficial del proveedor.
Este producto no es un medicamento. El consumo es responsabilidad de quien lo usa.”

Esto protege afiliación + COFEPRIS.

7. ESTRUCTURA DE LA LANDING (index.astro)
ORDEN EXACTO (NO CAMBIAR)

Hero

Problema claro

CTA principal

El verdadero problema

Por qué lo común falla

El mecanismo (educativo)

Presentación del producto

Para quién SÍ / NO

Prueba lógica (no testimonios médicos)

CTA secundario

Disclaimer visible

CTA (EJEMPLO)
<ButtonCTA
  href="LINK_AFILIADO"
  onClick={() =>
    trackAffiliateClick('producto-x', 'hero', 'empresa.com')
  }
>
  Comprar en el sitio oficial
</ButtonCTA>

8. FAVICONS & BRANDING (NO OLVIDAR)

En /public:

favicon.ico

favicon.svg

apple-touch-icon.png (180x180)

og-default.png (1200x630)

og-landing.png (por landing)

Esto impacta confianza + CTR social.

9. 404 PROFESIONAL

Diseño propio

noindex

Excluida del sitemap

10. CHECKLIST FINAL (DEFINITION OF DONE)

Antes de publicar:

✅ npm run build genera sitemap
✅ robots apunta a sitemap real
✅ Evento affiliate_checkout_click aparece en GA4 Debug
✅ OG image carga en WhatsApp / X
✅ Disclaimer visible
✅ Ningún claim médico
✅ No checkout propio
✅ Dominio rápido (<1s TTFB)

CONCLUSIÓN FINAL

Sí, esta es la estructura correcta.
Es elite, segura, reusable y escalable.
Puedes usarla para 1 o 50 landings sin deuda técnica.