# Checklist QA — VANEC versión final

## Navegación y enlaces
- [x] La navegación desktop incluye Home, Cursos, Ejercicios gratuitos, Sobre VANEC y Contacto.
- [x] La navegación móvil incluye las mismas páginas clave.
- [x] Los CTAs principales apuntan a `contacto.html`.
- [x] Los CTAs directos de Zalo apuntan a `https://zalo.me/0974997611`.
- [x] Footer enlaza a cursos, ejercicios, contacto, nosotros y páginas legales.

## SEO técnico
- [x] Todas las páginas HTML tienen `<title>` y meta description.
- [x] Todas las páginas indexables tienen `robots` correcto.
- [x] Canonical de home apunta a `https://vanec.vn/`.
- [x] No queda canonical a `https://vanec.vn/index.html`.
- [x] Open Graph y Twitter Card añadidos.
- [x] Hreflang limitado a `vi-VN` y `x-default`.
- [x] Sitemap incluye todas las páginas HTML principales.
- [x] `robots.txt` apunta al sitemap correcto.

## Contenido y arquitectura
- [x] Hay un único H1 por página.
- [x] `ejercicios.html` funciona como hub de ejercicios.
- [x] Hay 10 páginas individuales de ejercicios con contenido extenso, ejercicio interactivo, enlaces internos y CTA final.
- [x] `nosotros.html` incluye E-E-A-T y placeholders cuando faltan datos reales.
- [x] Páginas legales creadas con diseño coherente.

## UX/CRO
- [x] El objetivo principal se unifica en prueba de nivel gratuita.
- [x] Zalo queda como canal directo secundario.
- [x] Formularios incluyen microcopy de confianza.
- [x] Formularios están preparados para webhook mediante `data-webhook`, sin endpoint inventado.
- [x] El estado de thank-you funciona sin backend para hosting estático.

## Pop-up/intersticial
- [x] Desktop: exit-intent solo tras 30 segundos.
- [x] Mobile: 45 segundos + 70% de scroll.
- [x] No aparece en contacto ni páginas legales.
- [x] No aparece si el usuario está escribiendo en un campo.
- [x] No se repite durante 7 días si se cierra.
- [x] Copy neutral y profesional.

## Accesibilidad y rendimiento
- [x] JavaScript comprueba existencia de elementos antes de actuar.
- [x] Navegación móvil usa `aria-label` y `aria-expanded`.
- [x] Ejercicios interactivos usan estados accesibles.
- [x] Se respeta `prefers-reduced-motion`.
- [x] Google Fonts usa `display=swap`.
- [x] CSS conserva design tokens y branding visual.

## Pendientes obligatorios antes de publicación definitiva
- [ ] Confirmar razón social, dirección fiscal, email legal y datos de privacidad.
- [ ] Confirmar equipo docente real, credenciales y testimonios autorizados.
- [ ] Confirmar imágenes Open Graph definitivas.
- [ ] Conectar formularios a webhook/CRM real.
- [ ] Validar páginas legales con asesoría local en Vietnam.
