# Opción 2 implementada - Descarga directa tras formulario

Flujo implementado:

1. El usuario ve un bloque de lead magnet dentro del contenido.
2. Introduce nombre y Zalo/teléfono.
3. El formulario ejecuta la lógica de `js/main.js`.
4. Si existe `data-webhook`, envía el lead al CRM/Make.
5. Si `data-webhook` está vacío, usa fallback local para hosting estático.
6. Redirige a `gracias.html` mediante `data-redirect="gracias.html"`.
7. En `gracias.html`, el usuario puede descargar:
   - PDF checklist.
   - Audio MP3 de práctica.
   - Guion de audio para recrearlo en ElevenLabs.

Pendiente para captación real:
- Añadir URL real de webhook en `data-webhook=""`.
- Sustituir el MP3 final por audio final generado con ElevenLabs.
