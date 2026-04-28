# AUDITORÍA WEB COMPLETA — VANEC (vanec.vn)
## Vanguard English Center — Tiếng Anh Khách Sạn

**Fecha:** 24/04/2026  
**Auditor:** Análisis técnico SEO/CRO/UX  
**Alcance:** 28 archivos HTML, 1 CSS, 1 JS, sitemap, robots.txt

---

## 1. RESUMEN EJECUTIVO

### Estado general
La web tiene una base técnica sólida: HTML semántico, schema markup, CSS optimizado, JS no bloqueante, mobile-first y buena arquitectura de contenido con 18 artículos de recurso. Sin embargo, se detectaron **errores críticos de SEO** y **oportunidades de mejora significativas**.

### Problemas críticos detectados (ya corregidos)
1. **nosotros.html con meta tags y encabezados en ESPAÑOL** — Title, description, OG, Twitter y 7 headings del body estaban en español en una web vietnamita. Impacto directo en CTR en SERPs vietnamitas y señales de idioma confusas para Google.
2. **SearchAction schema** apuntando a una funcionalidad de búsqueda que NO existe.
3. **Sin favicon** en ninguna página (señal de calidad para navegadores y SERPs).
4. **og:type "website"** en las 18 páginas de artículo (debería ser "article").
5. **Prioridades de sitemap incorrectas** — Cookies/privacidad/términos con prioridad 0.75 (igual que artículos de contenido).

### Oportunidades principales (pendientes del cliente)
- **Cero imágenes en toda la web** — Sin directorio /img, sin fotos, sin elementos visuales.
- **Webhooks de formularios vacíos** — Los leads no se capturan realmente.
- **Datos de profesor y empresa placeholder** — "Giảng viên VANEC 01", sin credenciales.
- **Sin testimonios reales** — Los bloques de social proof están vacíos.

---

## 2. AUDITORÍA DETALLADA

### DISEÑO Y DINAMISMO
**Puntuación: 7/10**

Lo que funciona bien:
- Diseño navy + gold coherente y profesional para el sector educativo.
- CSS bien organizado con design tokens, responsive mobile-first.
- Animaciones de scroll reveal suaves con respeto a prefers-reduced-motion.
- Floating CTA de Zalo bien posicionado.
- Exit popup con reglas inteligentes (no invasivo, con cooldown).

Áreas de mejora:
- **Sin imágenes**: La web es 100% texto + CSS. No hay fotos de hoteles, profesores, estudiantes ni iconografía. Esto reduce la confianza y el engagement.
- **Hero sin elemento visual**: Solo texto, sin imagen de apoyo o ilustración.
- **Tarjetas de recurso monótonas**: Todas las cards tienen la misma estructura exacta.

### ADAPTACIÓN AL PÚBLICO OBJETIVO
**Puntuación: 8/10**

Lo que funciona bien:
- Contenido bilingüe (vietnamita UI + inglés para phrases/exercises) bien ejecutado.
- Tono profesional pero accesible para staff hotelero.
- Zalo como canal principal (correcto para Vietnam).
- Formularios con selector de posición (FO, F&B, HK, etc.) — bien segmentado.
- Precio visible (800.000 VNĐ/mes) — genera confianza.

Áreas de mejora:
- Falta email como opción de contacto (algunos usuarios lo prefieren).
- Sin contenido visual que muestre el entorno real de aprendizaje.

### SEO (PRIORIDAD MÁXIMA)
**Puntuación: 7.5/10 (después de correcciones: 8.5/10)**

#### SEO On-Page
✅ Titles únicos y optimizados con keyword principal en cada página.  
✅ Meta descriptions únicas y con CTA implícito.  
✅ Heading hierarchy correcta (H1 → H2 → H3).  
✅ Keywords naturales en el contenido.  
✅ Internal linking funcional entre artículos y páginas de conversión.  
❌ **CORREGIDO**: nosotros.html tenía title/description/OG en español.  
❌ **CORREGIDO**: og:type "website" en artículos → ahora "article".  

#### SEO Técnico
✅ Schema markup completo: EducationalOrganization, Course, Article, FAQPage, BreadcrumbList, ItemList.  
✅ Canonical URLs en todas las páginas.  
✅ Hreflang implementado (vi-VN + x-default).  
✅ CSS cargado con preload + noscript fallback.  
✅ JS deferred.  
✅ Critical CSS inline.  
✅ Robots.txt + Sitemap.xml.  
✅ noindex en gracias.html.  
❌ **CORREGIDO**: SearchAction schema sin funcionalidad real.  
❌ **CORREGIDO**: Sitemap con prioridades incorrectas para páginas legales.  
❌ **CORREGIDO**: Sin favicon (creado favicon.svg + referencias).  
⚠️ **PENDIENTE**: Sin imagen OG real (referencia a /img/og-vanec.jpg que no existe).  
⚠️ **PENDIENTE**: Archivos .md y .txt expuestos en producción (prompts/, pendientes.txt, etc.).  

#### Contenido
✅ 18 artículos de recurso con keywords de long-tail bien seleccionadas.  
✅ Contenido práctico y útil (exercises interactivos, dialogues, phrases).  
✅ Interlinking entre artículos relacionados.  
✅ Lead magnet integrado en artículos de recurso.  
⚠️ Artículos sin imágenes ni elementos visuales complementarios.  
⚠️ Algunos artículos tienen descripciones de "related links" genéricas.

### CRO (Conversión)
**Puntuación: 7/10**

Lo que funciona bien:
- Formulario en hero de homepage (captura inmediata).
- CTA "Đăng ký test miễn phí" repetido estratégicamente.
- Floating Zalo button persistente.
- Exit popup inteligente (30s desktop, 45s mobile, 7d cooldown).
- FAQ con schema en contacto.html.
- Lead magnet con checklist + audio.
- Página de agradecimiento con descargas y next steps.

Áreas de mejora (implementadas):
- **CORREGIDO**: Añadidos trust signals bajo formulario hero ("Miễn phí 100%", "Qua Zalo", "Không spam").
- **CORREGIDO**: Añadida sección de estadísticas/metodología antes del CTA final.
- **CORREGIDO**: Ampliadas tarjetas de recurso (de 3 a 6) para más interlinking.

Áreas pendientes del cliente:
- Webhooks vacíos — los formularios no envían datos a ningún CRM.
- Sin testimonios reales (social proof).
- Sin indicadores de urgencia o escasez.

### UX
**Puntuación: 8.5/10**

Lo que funciona bien:
- Navegación clara con 6 ítems.
- Mobile menu funcional con burger.
- Breadcrumbs en artículos.
- Active link highlight.
- Smooth scroll.
- Formularios con labels accesibles (sr-only) y autocomplete.
- Focus-visible con outline dorado.
- prefers-reduced-motion respetado.

Mejoras implementadas:
- **CORREGIDO**: Tap targets mínimos de 48px en mobile (nav, options).
- **CORREGIDO**: scroll-margin-top para anchor links bajo nav fija.
- **CORREGIDO**: Print styles.
- **CORREGIDO**: aria-expanded en accordions.

---

## 3. PLAN DE ACCIÓN PRIORIZADO

### ✅ QUICK WINS (ya implementados)

| # | Cambio | Impacto | Archivos |
|---|--------|---------|----------|
| 1 | nosotros.html: meta + body español → vietnamita | SEO CRÍTICO | nosotros.html |
| 2 | Favicon SVG creado + referencias en 28 páginas | SEO/UX | Todos + img/favicon.svg |
| 3 | og:type "article" en 18 artículos | SEO | 18 article pages |
| 4 | Eliminar SearchAction schema ficticio | SEO técnico | index.html |
| 5 | Sitemap prioridades (legal 0.75 → 0.2) | SEO | sitemap.xml |
| 6 | Trust signals en hero form | CRO | index.html |
| 7 | Stats section antes de CTA final | CRO | index.html |
| 8 | 6 resource cards (antes 3) | SEO/CRO | index.html |
| 9 | robots.txt: Disallow /downloads/ y /prompts/ | SEO | robots.txt |
| 10 | CSS: tap targets, scroll-margin, print | UX | css/style.css |
| 11 | contacto.html: nota española → vietnamita | UX | contacto.html |
| 12 | Accordion aria-expanded | A11y | Todos |

### ⚠️ MEJORAS PROFUNDAS (requieren acción del cliente)

| Prioridad | Tarea | Motivo |
|-----------|-------|--------|
| P0 | Configurar webhook real (n8n/Brevo/CRM) | Los leads NO se capturan |
| P0 | Crear imagen OG real (og-vanec.jpg) | Compartir en redes muestra imagen rota |
| P1 | Añadir fotos reales: profesores, hotel, aulas | Confianza visual |
| P1 | Completar datos nosotros.html: nombres, credenciales | E-E-A-T para Google |
| P1 | Añadir testimonios verificables | Social proof |
| P2 | Crear favicon.ico real (desde SVG) | Compatibilidad legacy |
| P2 | Añadir email corporativo en footer y contacto | Canal alternativo |
| P2 | Completar datos legales en privacidad/términos | Cumplimiento legal |
| P3 | Eliminar archivos internos del deploy (prompts/, .md, .txt) | Seguridad |
| P3 | Añadir apple-touch-icon.png real | iOS bookmarks |

---

## 4. ARCHIVOS MODIFICADOS

```
MODIFICADOS:
├── index.html          → SearchAction eliminado, trust signals, stats, 6 cards
├── nosotros.html       → 100% español → vietnamita (meta + body)
├── contacto.html       → Nota española → vietnamita
├── sitemap.xml         → Prioridades corregidas (legal 0.2)
├── robots.txt          → Disallow /downloads/, /prompts/
├── css/style.css       → UX polish (tap targets, print, scroll-margin)
├── 18x article pages   → og:type → "article"
├── 28x ALL HTML pages  → Favicon references + accordion a11y

CREADOS:
├── img/favicon.svg     → Favicon SVG (gold V sobre navy)
├── AUDITORIA-VANEC.md  → Este documento
```
