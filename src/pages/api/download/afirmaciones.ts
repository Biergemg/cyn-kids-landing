export const prerender = false;
import type { APIRoute } from 'astro';

const PDF_PATH = '/dl/b10bd8f2ba5eebf221c9/tarjetas-afirmaciones-positivas.pdf';

export const GET: APIRoute = async ({ url }) => {
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return new Response(null, { status: 302, headers: { Location: '/afirmaciones' } });
  }

  const STRIPE_KEY = import.meta.env.STRIPE_SECRET_KEY;

  if (!STRIPE_KEY) {
    return new Response('Acceso no autorizado', { status: 403 });
  }

  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${STRIPE_KEY}` } }
    );

    if (!stripeRes.ok) {
      return new Response('Acceso no autorizado', { status: 403 });
    }

    const session = await stripeRes.json() as {
      payment_status: string;
      amount_total: number | null;
      currency: string | null;
    };

    if (session.payment_status !== 'paid') {
      return new Response('Pago no verificado', { status: 403 });
    }

    // $97 MXN = 9700 centavos
    if (session.amount_total !== 9700 || session.currency?.toLowerCase() !== 'mxn') {
      return new Response('Producto no válido para esta descarga', { status: 403 });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: PDF_PATH,
        'Cache-Control': 'no-store, no-cache',
      },
    });
  } catch (err) {
    console.error('[download/afirmaciones] error:', err);
    return new Response('Error de verificación', { status: 503 });
  }
};
