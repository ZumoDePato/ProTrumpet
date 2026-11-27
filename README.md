# Brasso · técnica de trompeta

App web instalable (PWA) para estudiar trompeta: ejercicios de técnica escritos en partitura (escalas, patrones, flexibilidad, posiciones fijas, bending, pedales, picado y emisión), sesiones guiadas, PDF y MusicXML, más las herramientas de Trumpet Pro: plan del día, mi rutina, cronómetro, metrónomo, afinador, grabación y análisis, audiciones, biblioteca, coach y progreso.

## Usar
Abre la web publicada con GitHub Pages en Chrome para Android, concede el micrófono y usa ⋮ → Instalar aplicación.

## Coach con IA gratis
Fuera de claude.ai, el Coach usa un servidor propio en Cloudflare con su IA gratuita. Pasos en [`coach-worker/LEEME.txt`](coach-worker/LEEME.txt).

## Archivos
- `index.html` — la aplicación completa.
- `manifest.webmanifest`, `sw.js`, `icon.svg` — instalación y uso sin conexión.
- `coach-worker/` — código del servidor del Coach (no hace falta para que la app funcione).
