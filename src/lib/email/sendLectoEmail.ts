const RESEND_KEY = import.meta.env.RESEND_API_KEY as string | undefined;

const BASE = 'https://einsteinkids.cynponceglz.com';
const DL   = `${BASE}/dl/475068dba4230539160d`;

const DOWNLOADS = [
  { title: 'Gu&#237;a Kit Lecto-Escritura',    detail: 'Gu&#237;a de uso e instrucciones &middot; 14 p&#225;ginas', url: `${DL}/guia-kit-lectoescritura.pdf` },
  { title: 'Activar dos hemisferios',           detail: 'Espirales y trazos de manos &middot; 8 p&#225;ginas',       url: `${DL}/activar-dos-hemisferios.pdf` },
  { title: 'Ejercicios de rastreo visual',      detail: '5 fichas de discriminaci&#243;n visual',                     url: `${DL}/ejercicios-rastreo-visual.pdf` },
  { title: 'Trazo de alfabeto A-Z',             detail: '26 letras con orden de trazo',                               url: `${DL}/trazo-de-alfabeto.pdf` },
];

const CANVA_URL = 'https://canva.link/1po9unthgj2y8mh';

function downloadRow(title: string, detail: string, url: string): string {
  return `
    <a href="${url}" style="display:block;text-decoration:none;margin-bottom:12px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
             style="background:#fffdf8;border:1px solid #ead9ca;border-radius:16px;">
        <tr>
          <td style="padding:16px 18px;vertical-align:middle;">
            <p style="margin:0;font-size:14px;font-weight:700;color:#35261f;font-family:system-ui,sans-serif;">${title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#79665b;font-family:system-ui,sans-serif;">${detail} &middot; PDF</p>
          </td>
          <td width="48" style="padding:16px 18px 16px 0;vertical-align:middle;text-align:right;">
            <span style="font-size:18px;color:#bf5d69;">&#8595;</span>
          </td>
        </tr>
      </table>
    </a>`;
}

function buildHtml(sessionId: string): string {
  const pageUrl = `https://lectoescritura.cynponceglz.com/gracias?session_id=${encodeURIComponent(sessionId)}`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fff8ee;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff8ee;min-height:100vh;">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#fffdf8;border-radius:24px;border:1px solid #ead9ca;">

        <tr>
          <td style="padding:36px 40px 24px;text-align:center;border-bottom:1px solid #ead9ca;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#bf5d69;">Compra confirmada &#10003;</p>
            <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;color:#35261f;line-height:1.3;">
              Tu Kit de Lectoescritura<br>est&#225; listo para descargar.
            </h1>
            <p style="margin:14px 0 0;font-size:15px;color:#79665b;line-height:1.6;">
              Hola, aqu&#237; tienes los 5 materiales de tu kit.<br>
              Desc&#225;rgalos cuando quieras &#8212; el enlace no tiene fecha de vencimiento.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:28px 32px 8px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#35261f;text-transform:uppercase;letter-spacing:0.12em;">
              Tus archivos PDF
            </p>
            ${DOWNLOADS.map(d => downloadRow(d.title, d.detail, d.url)).join('')}
          </td>
        </tr>

        <tr>
          <td style="padding:4px 32px 28px;">
            <a href="${CANVA_URL}" style="display:block;text-decoration:none;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background:#fff3f1;border:1px solid #f0c8cc;border-radius:16px;">
                <tr>
                  <td style="padding:16px 18px;vertical-align:middle;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#35261f;font-family:system-ui,sans-serif;">Plantilla editable en Canva</p>
                    <p style="margin:4px 0 0;font-size:12px;color:#79665b;font-family:system-ui,sans-serif;">Abre directamente en Canva &middot; Editable y reusable</p>
                  </td>
                  <td width="48" style="padding:16px 18px 16px 0;vertical-align:middle;text-align:right;">
                    <span style="font-size:16px;color:#bf5d69;">&#8599;</span>
                  </td>
                </tr>
              </table>
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:0 32px 32px;text-align:center;">
            <a href="${pageUrl}"
               style="display:inline-block;background:#bf5d69;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:100px;font-family:system-ui,sans-serif;">
              Ver mi p&#225;gina de descarga &#8594;
            </a>
            <p style="margin:14px 0 0;font-size:12px;color:#9e8880;">
              Guarda este correo. Puedes volver a esta p&#225;gina en cualquier momento.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 32px;border-top:1px solid #ead9ca;">
            <p style="margin:0;font-size:13px;color:#5f4c42;line-height:1.7;">
              &#191;Problema con alguna descarga? Escr&#237;benos a
              <a href="mailto:info@cynponceglz.com" style="color:#bf5d69;font-weight:700;">info@cynponceglz.com</a>
              y lo resolvemos en menos de 24 horas.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px;border-top:1px solid #ead9ca;text-align:center;">
            <p style="margin:0;font-size:11px;color:#b09e96;font-family:system-ui,sans-serif;">
              Cyn &middot; Einstein Kids &middot; <a href="https://einsteinkids.cynponceglz.com" style="color:#b09e96;">einsteinkids.cynponceglz.com</a>
            </p>
            <p style="margin:6px 0 0;font-size:11px;color:#b09e96;">
              Recibiste este correo porque realizaste una compra en nuestro sitio.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendLectoEmail(to: string, sessionId: string): Promise<void> {
  if (!RESEND_KEY || !to) return;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `lecto-${sessionId}`,
      },
      body: JSON.stringify({
        from: 'Cyn - Einstein Kids <info@cynponceglz.com>',
        to: [to],
        reply_to: 'info@cynponceglz.com',
        subject: 'Tu Kit de Lectoescritura esta listo para descargar',
        html: buildHtml(sessionId),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[email] Resend error:', res.status, body);
    }
  } catch (err) {
    console.error('[email] fetch failed:', err);
  }
}
