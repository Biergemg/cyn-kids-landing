# Stripe Checkout · Kit de Inicio a la Lectoescritura

No se encontraron credenciales `STRIPE_SECRET_KEY`, `sk_live` ni `sk_test` en el proyecto, por eso no se pudo actualizar Stripe por API desde esta sesión.

## Actualización manual recomendada

1. Entra a Stripe Dashboard.
2. Ve a **Product catalog** y abre el producto vinculado al Payment Link:
   `https://buy.stripe.com/28E9ATft02HW9HPbb92wU02`
3. Actualiza el producto con estos datos:
   - **Name:** Kit de Inicio a la Lectoescritura
   - **Price:** $197 MXN
   - **Description:** Kit digital imprimible para preparar cuerpo, ojos y mano antes de iniciar la escritura. Incluye actividades de coordinación, rastreo visual, trazo del alfabeto, guía de uso y plantilla editable en Canva.
   - **Image:** subir `public/images/lectoescritura-mockup.png`
4. Guarda cambios y abre el Payment Link en modo incógnito para confirmar que el checkout muestra la imagen premium.

## Nota

No cambies la URL de compra en la landing a menos que Stripe cree un Payment Link nuevo. Si crea uno nuevo, reemplaza `STRIPE_LINK` en `src/pages/lectoescritura/index.astro`.
