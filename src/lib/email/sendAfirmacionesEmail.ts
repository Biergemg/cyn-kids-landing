const RESEND_KEY = import.meta.env.RESEND_API_KEY as string | undefined;

const DL = 'https://afirmaciones.cynponceglz.com/dl/b10bd8f2ba5eebf221c9';

const DOWNLOADS = [
  {
    title: '30 Tarjetas de Afirmaciones Positivas',
    detail: '30 tarjetas imprimibles &middot; PDF completo',
    url: `${DL}/tarjetas-afirmaciones-positivas.pdf`,
  },
];

function downloadRow(title: string, detail: string, url: string): string {
  return `
    <a href="${url}" style="display:block;text-decoration:none;margin-bottom:12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="background:#fffdf8;border:1px solid #ead9ca;border-radius:16px;">
        <tr>
          <td style="padding:16px 18px;vertical-align:middle;">
            <p style="margin:0;font-size:14px;font-weight:700;color:#35261f;font-family:Arial,Helvetica,sans-serif;">${title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#79665b;font-family:Arial,Helvetica,sans-serif;">${detail}</p>
          </td>
          <td width="48" style="padding:16px 18px 16px 0;vertical-align:middle;text-align:right;">
            <span style="font-size:20px;color:#bf5d69;font-family:Arial,Helvetica,sans-serif;">&#8595;</span>
          </td>
        </tr>
      </table>
    </a>`;
}

function buildHtml(sessionId: string): string {
  const pageUrl = `https://afirmaciones.cynponceglz.com/gracias?session_id=${encodeURIComponent(sessionId)}`;

  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Tus Tarjetas de Afirmaciones Positivas</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; }
    @media only screen and (max-width:600px) {
      .card { width:100% !important; border-radius:0 !important; }
      .pad { padding:24px 20px !important; }
      .pad-sm { padding:20px 20px !important; }
      h1 { font-size:22px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#fff8ee;font-family:Arial,Helvetica,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background:#fff8ee;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background:#fffdf8;border-radius:24px;border:1px solid #ead9ca;">

          <!-- HEADER -->
          <tr>
            <td class="pad" style="padding:36px 40px 24px;text-align:center;border-bottom:1px solid #ead9ca;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#bf5d69;font-family:Arial,Helvetica,sans-serif;">
                Compra confirmada &#10003;
              </p>
              <h1 style="margin:10px 0 0;font-size:26px;font-weight:700;color:#35261f;line-height:1.35;font-family:Georgia,'Times New Roman',serif;">
                Tus 30 Tarjetas de Afirmaciones<br>Positivas est&#225;n listas.
              </h1>
              <p style="margin:14px 0 0;font-size:15px;color:#79665b;line-height:1.65;font-family:Arial,Helvetica,sans-serif;">
                Aqu&#237; tienes tu descarga.<br>
                El enlace no tiene fecha de vencimiento &#8212; puedes volver cuando quieras.
              </p>
            </td>
          </tr>

          <!-- DOWNLOADS -->
          <tr>
            <td class="pad-sm" style="padding:28px 32px 8px;">
              <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#35261f;text-transform:uppercase;letter-spacing:2px;font-family:Arial,Helvetica,sans-serif;">
                Tu archivo PDF
              </p>
              ${DOWNLOADS.map(d => downloadRow(d.title, d.detail, d.url)).join('')}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="pad-sm" style="padding:8px 32px 32px;text-align:center;">
              <a href="${pageUrl}"
                 style="display:inline-block;background:#bf5d69;color:#ffffff;text-decoration:none;
                        font-size:15px;font-weight:700;padding:14px 32px;border-radius:100px;
                        font-family:Arial,Helvetica,sans-serif;mso-padding-alt:14px 32px;">
                Ver mi p&#225;gina de descarga &#8594;
              </a>
              <p style="margin:14px 0 0;font-size:12px;color:#9e8880;font-family:Arial,Helvetica,sans-serif;">
                Guarda este correo. Puedes volver a esta p&#225;gina en cualquier momento.
              </p>
            </td>
          </tr>

          <!-- SOPORTE -->
          <tr>
            <td class="pad-sm" style="padding:20px 32px 28px;border-top:1px solid #ead9ca;">
              <p style="margin:0;font-size:13px;color:#5f4c42;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                &#191;Problema con la descarga? Escr&#237;benos a
                <a href="mailto:info@cynponceglz.com" style="color:#bf5d69;font-weight:700;text-decoration:none;">info@cynponceglz.com</a>
                y lo resolvemos en menos de 24 horas.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:18px 32px;border-top:1px solid #ead9ca;text-align:center;">
              <p style="margin:0;font-size:11px;color:#b09e96;font-family:Arial,Helvetica,sans-serif;">
                Cyn &middot; Afirmaciones Positivas &middot;
                <a href="https://afirmaciones.cynponceglz.com" style="color:#b09e96;text-decoration:none;">afirmaciones.cynponceglz.com</a>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#b09e96;font-family:Arial,Helvetica,sans-serif;">
                Recibiste este correo porque realizaste una compra en nuestro sitio.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function sendAfirmacionesEmail(to: string, sessionId: string): Promise<void> {
  if (!RESEND_KEY || !to) return;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `afirmaciones-${sessionId}`,
      },
      body: JSON.stringify({
        from: 'Cyn - Afirmaciones <info@cynponceglz.com>',
        to: [to],
        reply_to: 'info@cynponceglz.com',
        subject: 'Tus 30 Tarjetas de Afirmaciones Positivas están listas',
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
