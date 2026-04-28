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

## QA adicional - Opción 2 lead magnet

- [x] `gracias.html` creada con diseño VANEC y navegación completa.
- [x] `gracias.html` marcada como `noindex, follow`.
- [x] Pop-up desactivado también en `gracias.html`.
- [x] Formularios de lead magnet redirigen con `data-redirect="gracias.html"`.
- [x] `main.js` soporta redirección posterior al envío.
- [x] PDF de descarga existe en `/downloads/50-cau-tieng-anh-khach-san.pdf`.
- [x] Audio MP3 existe en `/downloads/hotel-english-audio-practice.mp3`.
- [x] Script de audio existe en `/downloads/audio-practice-script.txt`.
- [x] Prompts para Manus y ElevenLabs incluidos en `/prompts/`.
- [x] PDF final del lead magnet integrado en `/downloads/50-cau-tieng-anh-khach-san.pdf`.
- [ ] Conectar webhook real para que el lead se guarde antes de redirigir.
- [ ] Probar formulario de lead magnet desde web publicada, no solo en local.
- [ ] Probar descarga de PDF/audio en móvil.

## QA v5 - Archivos finales del lead magnet

- [x] PDF final recibido e integrado con el nombre esperado.
- [x] MP3 final recibido e integrado con el nombre esperado.
- [x] `gracias.html` apunta a los archivos finales sin cambiar rutas.
- [x] Prompts actualizados con enfoque vietnamita / acento vietnamita suave.
- [ ] Probar descarga y reproducción en la URL publicada tras deploy.
