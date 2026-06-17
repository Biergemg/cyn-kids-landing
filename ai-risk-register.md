# AI Risk Register — CYN Kids Landing

Last reviewed: 2026-06-17
Reviewed by: claude-sonnet-4-6 + usuario

---

## Active Risks

| Risk | Impact | Probability | Audit Trigger | Mitigation | Status |
|------|--------|------------|---------------|-----------|--------|
| CAPI Purchase sin verificación de pago | High | Mitigated (fue real, ya cerrado) | Cambio en /gracias o /lectoescritura/gracias | paymentVerified check en ambas páginas | Monitoring |
| Recarga de /gracias genera Purchase duplicado en Meta | High | Mitigated (fix 0e6ed71) | Cambio en lógica de eventId | eventId = SHA-256(purchase:sessionId) | Monitoring |
| Email duplicado por recarga después de 24h | Low | Low | Recarga de /lectoescritura/gracias >24h post-compra | Idempotency-Key expira en 24h — riesgo aceptable | Monitoring |
| Context loss después de compactación | Medium | High | Sesión > 2h o tarea compleja | PreCompact hook guarda a Engram; HANDOVER.md creado | Mitigated |
| Contract drift (CLAUDE.md desactualizado) | Medium | Medium | Upgrade de dependencias o refactor de arquitectura | pre-commit hook actualiza last_updated automáticamente | Mitigated |
| Deploy a producción sin verificar payment gate | High | Low | Cambio en src/middleware.ts | middleware.ts en lista de archivos prohibidos | Mitigated |
| MCP server sin auditar (r-mcptools) | Medium | Low | Nueva sesión con R integration | Ejecutar 04-security-checklist.md para r-mcptools | Open |
| Engram truncando artefactos largos | Medium | Low | Artefacto guardado es más corto de lo esperado | Dividir saves en chunks < 2000 tokens; verificar retrieval | Monitoring |
| Sin tests ni linter — deuda técnica invisible | Medium | High | Cualquier código nuevo | Gates 1+2 en WAIVED; verificación manual; build check | Open |
| Vercel CLI no instalado — no se puede hacer env pull | Low | High | Necesidad de sincronizar env vars localmente | Copiar keys manualmente desde Vercel dashboard a .env.local | Open |

---

## Closed Risks

| Risk | Resolution | Closed On |
|------|-----------|-----------|
| CAPI disparando en todas las cargas de /gracias (commit 4bf59d9) | paymentVerified check agregado en commit 59ff942 | 2026-06-03 |
| Browser Pixel disparando en recargas con nuevo eventId | eventId determinístico SHA-256 en commit 0e6ed71 | 2026-06-16 |
| FB_TEST_EVENT_CODE enviado en producción | Eliminado — solo se activa si env var está definida | 2026-06-06 |
| Debug endpoint exponiendo env vars | Eliminado en commit 29d60e5 | 2026-06-06 |
| CAPI Graph API versión deprecada (v19.0) | Actualizado a v22.0 en commit 8348a34 | 2026-06-16 |
| event_source_url desde dominio no verificado | URL canónica einsteinkids.cynponceglz.com en commit 8348a34 | 2026-06-16 |
| Dominios sin verificar en Meta Business | einsteinkids + lectoescritura + cynponceglz.com verificados | 2026-06-16 |
| STRIPE_SECRET_KEY ausente localmente | .env.local creado con todas las credenciales | 2026-06-16 |
| Correos manuales de recursos post-compra | Email automático Resend en commits 5ff1b28–e323870 | 2026-06-17 |
| RESEND_API_KEY ausente en Vercel | Agregada por usuario en Vercel dashboard | 2026-06-17 |

---

## Notas de contexto del proyecto

**Riesgo crítico histórico:** Entre 2026-05-27 (commit 4bf59d9) y 2026-06-03 (commit 59ff942),
el CAPI y el Pixel browser disparaban Purchase en cada visita a `/lectoescritura/gracias` sin
verificar `payment_status`. Esto generó eventos falsos en Meta Ads, causando la discrepancia
de 5 compras Meta vs 3 pagos reales en Stripe. Este riesgo está cerrado pero debe monitorearse
en cualquier cambio futuro a las páginas `/gracias`.

**Patrón de riesgo — analytics:** Cualquier página de confirmación de pago debe tener `paymentVerified`
como gate antes de disparar eventos de analytics (CAPI, Pixel, GTM).

**Patrón de riesgo — email:** Cualquier email post-compra debe usar el mismo gate
`paymentVerified && stripeEmail && sessionId` y un Idempotency-Key basado en sessionId.
