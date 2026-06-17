# HANDOVER — 2026-06-16T18:00Z

> **Para el agente que retoma esta sesión:** Lee este archivo PRIMERO, antes de
> cualquier otra acción. Luego lee `.ai-context/session-context.md`. Solo entonces
> continúa desde "Exact Next Step."
>
> No inicies ninguna tarea antes de completar esta secuencia de lectura.

---

## Estado actual — todo en orden

El proyecto está en estado limpio. No hay tareas bloqueadas ni deuda técnica pendiente
de esta sesión. Los tres problemas críticos de Meta CAPI están resueltos y deployados.

---

## Decisions Made This Session

- **eventId determinístico:** `SHA-256('purchase:' + sessionId)` — commit `0e6ed71`
- **paymentVerified gate:** CAPI y Pixel solo si `payment_status === 'paid'` — commit `59ff942`
- **CAPI Graph API v19.0 → v22.0:** v19 deprecado mayo 2025 — commit `8348a34`
- **event_source_url canónico:** siempre `einsteinkids.cynponceglz.com` independiente del subdominio de entrada — commit `8348a34`
- **Dominios verificados en Meta Business:** `einsteinkids.cynponceglz.com`, `lectoescritura.cynponceglz.com`, `cynponceglz.com` — todos Verificado
- **.env.local creado:** `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `FB_PIXEL_ID`, `FB_ACCESS_TOKEN` — gitignoreado, solo local
- **Auditoría Stripe completa:** 8 pagos reales, 91 abandonos, 99 sesiones totales. Discrepancia Meta explicada por período sin paymentVerified (May 27–Jun 3).

---

## Exact Next Step When Resuming

No hay bloqueos activos. Si el usuario trae una nueva tarea, leer este HANDOVER +
`.ai-context/session-context.md` y continuar desde ahí.

Si se quieren revisar las "fallas" restantes en Meta Origenes de Datos: esperar 24–48h
para que Meta procese los dominios verificados y la nueva versión de API. Si persisten
fallas después de ese período, revisar el Event Match Quality score en Meta Events Manager.

---

## Files Modified This Session

```
src/pages/lectoescritura/gracias.astro   (commits 8348a34 — API v22, URL canónica)
public/p27u38qfircdw7hp2gc6dnql0pbsc5.html  (verificación lectoescritura.cynponceglz.com)
public/eh2yrwhbxxs2d7dhr9btlz7rzhr82v.html  (verificación einsteinkids.cynponceglz.com)
HANDOVER.md                               (este archivo)
ai-risk-register.md                       (riesgos cerrados actualizados)
.env.local                                (creado — gitignoreado — credenciales locales)
```

---

## Open Questions / Deferred Items

- [ ] **r-mcptools sin auditar.** Ejecutar `04-security-checklist.md` para verificar el MCP server. Bajo riesgo activo pero no auditado.
- [ ] **Sin tests ni linter.** Gates 1+2 en modo WAIVED. Evaluar instalar Biome/ESLint si se agrega más lógica de negocio.
- [ ] **Event Match Quality en Meta.** Verificar score en Meta Events Manager 24-48h después de los fixes. Objetivo: score ≥ 6.

---

## Context at Handover

| Field | Value |
|-------|-------|
| Context usage at rotation | sesión activa |
| Active mode | standard |
| Last commit pushed | cleanup endpoint verificación (main) |
| Tests passing | N/A — no hay test framework |
| Warnings delta from baseline | 0 (no linter) |
| Gate 1 last result | N/A (WAIVED) |
| Gate 2 last result | N/A (WAIVED) |
| Dominios Meta verificados | einsteinkids ✅ lectoescritura ✅ cynponceglz.com ✅ |
