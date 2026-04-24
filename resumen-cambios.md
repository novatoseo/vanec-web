# Resumen de cambios — VANEC v3

## Cambios principales

- Se ha sustituido la comunicación de “tres cursos” por un único programa flexible de inglés hotelero adaptado a situaciones reales.
- Se ha incorporado el nombre completo `Vanguard English Center` en home, footer, schemas y páginas clave.
- Se ha creado el hub `recursos.html` con contenido informacional completo y enlazado desde navegación principal, home, cursos, ejercicios y footer.
- Se han creado 8 páginas informacionales nuevas orientadas a búsquedas de hotel English: reception, F&B, housekeeping, complaints, concierge, interview, vocabulary y study plan.
- Se ha integrado un lead magnet no invasivo: checklist “50 câu tiếng Anh khách sạn dùng nhiều nhất”, ubicado en home/curso/recursos/artículos como bloque contextual, no como pop-up.
- Se ha reforzado el enlazado interno entre recursos, ejercicios, curso único y contacto.
- Se ha corregido un error de JavaScript que duplicaba una constante en la lógica de ejercicios.

## Estrategia SEO aplicada

- Home: posicionamiento institucional de Vanguard English Center.
- Curso: una página transaccional para “khóa học tiếng Anh khách sạn” con enfoque adaptativo.
- Ejercicios: mantiene intención práctica y enlaza a recursos explicativos.
- Recursos: nuevo cluster informacional para captar tráfico frío y retener usuarios.
- Artículos: cada pieza enlaza a ejercicios relacionados y a la página de curso/contacto.

## CTAs revisados

- CTA principal: `Đăng ký / Kiểm tra trình độ miễn phí`.
- CTA secundario: `Chat Zalo`.
- CTA educativo: `Xem tài nguyên` / `Làm bài tập`.
- Lead magnet integrado solo en contexto de aprendizaje.

## Páginas nuevas creadas

- recursos.html
- hotel-receptionist-english-phrases.html
- english-for-restaurant-staff-in-hotels.html
- hotel-english-for-housekeeping-staff.html
- hotel-guest-complaint-phrases.html
- concierge-english-phrases.html
- hotel-job-interview-questions-english.html
- hotel-english-vocabulary-list.html
- english-for-hotel-staff-in-vietnam.html

## Datos reales

- Zalo/Tel real implementado: 0974997611.
- No se han inventado email, razón social, dirección fiscal, profesores, alumnos, hoteles ni métricas.

## Pendientes

Ver `pendientes.txt`.

## Actualización opción 2 - Lead magnet con descarga directa

- Se ha añadido `gracias.html` como página de entrega del lead magnet tras enviar el formulario.
- Los formularios de lead magnet incorporan `data-redirect="gracias.html"` para redirigir al usuario a la descarga.
- `js/main.js` ahora soporta `data-redirect`: primero intenta enviar el lead al webhook si existe y después redirige a la página de gracias.
- Si `data-webhook` está vacío, el sitio sigue funcionando en hosting estático con fallback local, pero la captación real queda pendiente hasta conectar Make/CRM.
- Se ha creado `/downloads/50-cau-tieng-anh-khach-san.pdf` como PDF final aportado por el cliente para evitar enlaces rotos.
- Se ha creado `/downloads/hotel-english-audio-practice.mp3` como audio final aportado por el cliente para que el flujo de descarga esté completo.
- Se ha creado `/downloads/audio-practice-script.txt` con el guion completo para recrear el audio en ElevenLabs.
- Se han añadido prompts en `/prompts/` para generar el PDF final con Manus y el audio final con ElevenLabs.
- El pop-up queda desactivado también en `gracias.html` para no interrumpir la descarga.
- `gracias.html` lleva `noindex, follow` y no se incluye en sitemap porque es una página posterior a conversión.

### Archivos nuevos añadidos

- `gracias.html`
- `downloads/50-cau-tieng-anh-khach-san.pdf`
- `downloads/hotel-english-audio-practice.mp3`
- `downloads/audio-practice-script.txt`
- `prompts/prompt-manus-lead-magnet.md`
- `prompts/prompt-elevenlabs-audio.md`
- `prompts/instrucciones-opcion-2-descarga.md`

### Recomendación antes de publicación final

- Añadir URL real de Make/CRM en `data-webhook=""` para guardar los leads de forma real.

## Actualización v5 - Lead magnet final integrado

- Se ha sustituido el PDF anterior por el archivo final aportado por el cliente: `downloads/50-cau-tieng-anh-khach-san.pdf`.
- Se ha sustituido el audio anterior por el MP3 final aportado por el cliente: `downloads/hotel-english-audio-practice.mp3`.
- La página `gracias.html` mantiene los enlaces de descarga y el reproductor de audio funcionando con los archivos finales.
- Los prompts guardados en `/prompts/` se han actualizado para reforzar que el PDF sea principalmente en vietnamita y que el audio use instrucciones en vietnamita con inglés claro y acento vietnamita suave.
