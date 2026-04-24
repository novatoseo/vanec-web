# Checklist QA — VANEC v3

## Navegación

- [x] Navegación desktop incluye Home, Curso, Ejercicios, Recursos, Nosotros y Contacto.
- [x] Navegación móvil incluye las mismas páginas clave.
- [x] Footer enlaza curso, ejercicios, recursos, nosotros, contacto y legales.

## SEO

- [x] Home canonical apunta a https://vanec.vn/ y evita duplicidad /index.html.
- [x] Sitemap incluye todas las páginas HTML actuales.
- [x] robots.txt apunta al sitemap correcto.
- [x] Se mantiene un H1 principal por página creada en v3.
- [x] Recursos informacionales tienen Article schema y breadcrumbs.
- [x] Curso usa Course schema singular, no tres cursos separados.

## UX/CRO

- [x] El objetivo principal se mantiene: test de nivel gratuito.
- [x] Zalo queda como canal directo secundario.
- [x] Lead magnet aparece como bloque contextual, no como intersticial invasivo.
- [x] Pop-up mantiene reglas no invasivas heredadas: desktop exit-intent tras 30s; móvil 45s + 70% scroll; bloqueado en contacto y legales.

## QA técnico

- [x] JS corregido: eliminada declaración duplicada de `const result`.
- [x] HTML/CSS/JS puro, sin frameworks.
- [x] Google Fonts mantiene display=swap.
- [x] Formularios preparados con `data-webhook=""` sin inventar endpoint.

## Pendientes

- [x] Todos los comentarios `PENDIENTE` se listan en pendientes.txt.
