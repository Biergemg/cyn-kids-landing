export const prerender = false;
import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { sendAfirmacionesEmail } from '../../../lib/email/sendAfirmacionesEmail';

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 });

// Stripe webhook signature verification (manual — no stripe npm package)
function verifyWebhook(payload: string, sigHeader: string, secret: string): unknown {
  const parts: Record<string, string> = {};
  sigHeader.split(',').forEach(pair => {
    const [k, v] = pair.split('=');
    if (k && v) parts[k] = v;
  });

  const timestamp = parts['t'];
  const v1 = parts['v1'];
  if (!timestamp || !v1) throw new Error('Invalid signature header');

  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  if (age > 300) throw new Error('Webhook too old');

  const computed = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(v1, 'hex')))
    throw new Error('Signature mismatch');

  return JSON.parse(payload);
}

export const POST: APIRoute = async ({ request }) => {
  const WEBHOOK_SECRET = import.meta.env.STRIPE_WEBHOOK_SECRET;
  const FB_PIXEL_ID = import.meta.env.FB_PIXEL_ID ?? '1024976901790952';
  const FB_TOKEN = import.meta.env.FB_ACCESS_TOKEN;

  if (!WEBHOOK_SECRET) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not configured');
    return new Response('Webhook not configured', { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') ?? '';

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = verifyWebhook(body, sig, WEBHOOK_SECRET) as typeof event;
  } catch (err) {
    console.error('[webhook] verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('OK', { status: 200 });
  }

  const session = event.data.object as {
    id: string;
    payment_status: string;
    amount_total: number | null;
    currency: string | null;
    customer_email?: string | null;
    customer_details?: { email?: string | null; phone?: string | null } | null;
  };

  // Gate 1: must be paid
  if (session.payment_status !== 'paid') {
    return new Response('OK', { status: 200 });
  }

  // Gate 2: must be Afirmaciones ($97 MXN = 9700 centavos)
  if (session.amount_total !== 9700 || session.currency?.toLowerCase() !== 'mxn') {
    return new Response('OK', { status: 200 });
  }

  const sessionId = session.id;
  const rawEmail = session.customer_details?.email ?? session.customer_email;
  const stripeEmail = rawEmail?.trim().toLowerCase();
  const rawPhone = session.customer_details?.phone;
  const stripePhone = rawPhone?.replace(/\D/g, '');

  // Deterministic event_id — same as /gracias for Pixel+CAPI deduplication
  const eventId = crypto
    .createHash('sha256')
    .update(`afirmaciones:${sessionId}`)
    .digest('hex');

  const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

  // ── Email — Idempotency-Key prevents duplicates if /gracias also fires ───────
  if (stripeEmail && sessionId) {
    try {
      await sendAfirmacionesEmail(stripeEmail, sessionId);
    } catch (err) {
      console.error('[webhook] email failed:', err);
    }
  }

  // ── Meta CAPI Purchase ───────────────────────────────────────────────────────
  if (FB_TOKEN) {
    const userData: Record<string, string> = {};
    if (stripeEmail) userData.em = sha256(stripeEmail);
    if (stripePhone) userData.ph = sha256(stripePhone);
    if (sessionId) userData.external_id = sha256(sessionId);

    const payload = {
      data: [{
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: `https://afirmaciones.cynponceglz.com/gracias?session_id=${encodeURIComponent(sessionId)}`,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          value: 97,
          currency: 'MXN',
          content_name: '30 Tarjetas de Afirmaciones Positivas',
          content_ids: ['tarjetas-afirmaciones'],
          content_type: 'product',
          num_items: 1,
        },
      }],
    };

    try {
      const res = await fetch(
        `https://graph.facebook.com/v22.0/${FB_PIXEL_ID}/events?access_token=${FB_TOKEN}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
      );
      if (!res.ok) console.error('[webhook/CAPI] error:', await res.text());
    } catch (err) {
      console.error('[webhook/CAPI] fetch failed:', err);
    }
  }

  console.log(`[webhook] fulfilled: ${sessionId}`);
  return new Response('OK', { status: 200 });
};
