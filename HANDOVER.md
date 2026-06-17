# HANDOVER — 2026-06-17T00:00Z

> **Para el agente que retoma esta sesión:** Lee este archivo PRIMERO, antes de
> cualquier otra acción. Luego lee `.ai-context/session-context.md`. Solo entonces
> continúa desde "Exact Next Step."
>
> No inicies ninguna tarea antes de completar esta secuencia de lectura.

---

## Estado actual — todo en orden

El proyecto está en estado limpio. No hay tareas bloqueadas ni deuda técnica pendiente.
Email de confirmación automático deployado y verificado en producción.

---

## Decisions Made This Session

- **eventId determinístico:** `SHA-256('purchase:' + sessionId)` — commit `0e6ed71`
- **paymentVerified gate:** CAPI y Pixel solo si `payment_status === 'paid'` — commit `59ff942`
- **CAPI Graph API v19.0 → v22.0:** v19 deprecado mayo 2025 — commit `8348a34`
- **event_source_url canónico:** siempre `einsteinkids.cynponceglz.com` independiente del subdominio de entrada — commit `8348a34`
- **Dominios verificados en Meta Business:** `einsteinkids.cynponceglz.com`, `lectoescritura.cynponceglz.com`, `cynponceglz.com` — todos Verificado
- **.env.local creado:** `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `FB_PIXEL_ID`, `FB_ACCESS_TOKEN`, `RESEND_API_KEY` — gitignoreado, solo local
- **Email automático post-pago (Resend):** `src/lib/email/sendLectoEmail.ts` — se dispara solo si `paymentVerified && stripeEmail && sessionId` — commits `5ff1b28`, `a50e1a4`, `5060a6f`, `e323870`
- **Auditoría Stripe completa:** 8 pagos reales, 91 abandonos, 99 sesiones totales. Discrepancia Meta explicada por período sin paymentVerified (May 27–Jun 3).

---

## Email de confirmación — arquitectura

| Campo | Valor |
|-------|-------|
| Función | `src/lib/email/sendLectoEmail.ts` |
| Disparador | `lectoescritura/gracias.astro` — línea 122, después de CAPI |
| Gate | `paymentVerified && stripeEmail && sessionId` |
| Proveedor | Resend (key en Vercel env var `RESEND_API_KEY`) |
| From | `Cyn - Lectoescritura <info@cynponceglz.com>` |
| Idempotency | `lecto-{sessionId}` — previene duplicados 24h |
| Links descarga | `lectoescritura.cynponceglz.com/dl/475068dba4230539160d/*.pdf` |
| Contenido | 4 PDFs + plantilla Canva + botón CTA a página de descarga |
| Var en Vercel | `RESEND_API_KEY` — ya agregada por usuario en dashboard |

**Patrón de riesgo email:** Si se agrega una nueva página de confirmación de pago,
replicar el mismo gate `paymentVerified && stripeEmail && sessionId` antes de llamar sendEmail.

---

## Exact Next Step When Resuming

No hay bloqueos activos. Si el usuario trae una nueva tarea, leer este HANDOVER +
`.ai-context/session-context.md` y continuar desde ahí.

Verificaciones pendientes (no bloqueantes):
- **Event Match Quality en Meta** — revisar score en Meta Events Manager. Objetivo: ≥ 6.
- **Primer pago real post-deploy** — confirmar que el comprador recibe el email automáticamente.

---

## Files Modified This Session

```
src/lib/email/sendLectoEmail.ts          (nuevo — email automático post-pago)
src/pages/lectoescritura/gracias.astro   (email integrado + CAPI v22 + URL canónica)
public/p27u38qfircdw7hp2gc6dnql0pbsc5.html  (verificación lectoescritura.cynponceglz.com)
public/eh2yrwhbxxs2d7dhr9btlz7rzhr82v.html  (verificación einsteinkids.cynponceglz.com)
HANDOVER.md                              (este archivo)
ai-risk-register.md                      (riesgos actualizados)
.env.local                               (creado — gitignoreado — credenciales locales)
```

---

## Open Questions / Deferred Items

- [ ] **r-mcptools sin auditar.** Ejecutar `04-security-checklist.md` para verificar el MCP server. Bajo riesgo activo pero no auditado.
- [ ] **Sin tests ni linter.** Gates 1+2 en modo WAIVED. Evaluar instalar Biome/ESLint si se agrega más lógica de negocio.
- [ ] **Event Match Quality en Meta.** Verificar score en Meta Events Manager 24-48h después de los fixes. Objetivo: score ≥ 6.
- [ ] **Confirmar primer email real.** Verificar con el próximo comprador que el correo llegó correctamente.

---

## Context at Handover

| Field | Value |
|-------|-------|
| Context usage at rotation | sesión activa |
| Active mode | standard |
| Last commit pushed | e323870 — subject con tilde (main) |
| Tests passing | N/A — no hay test framework |
| Warnings delta from baseline | 0 (no linter) |
| Gate 1 last result | N/A (WAIVED) |
| Gate 2 last result | N/A (WAIVED) |
| Dominios Meta verificados | einsteinkids ✅ lectoescritura ✅ cynponceglz.com ✅ |
| Email automático | ✅ deployado y verificado con test a biergemg@gmail.com |
| RESEND_API_KEY en Vercel | ✅ agregada por usuario |
