/*!
 * Mapa Interactivo La Paz v0.3.0
 * Estilo lápiz de color sobre papel · MapLibre GL + OpenStreetMap (OpenFreeMap)
 */
(function () {
'use strict';

/* ======================= íconos y barcos ======================= */
const ICONS = {"cathedral": "<rect x=\"12\" y=\"20\" width=\"24\" height=\"19\" fill=\"#f3e6cc\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"24\" fill=\"#ead2a8\"/><rect x=\"33\" y=\"15\" width=\"8\" height=\"24\" fill=\"#ead2a8\"/> <path d=\"M7 15 L11 8 L15 15Z M33 15 L37 8 L41 15Z\" fill=\"#c8553d\"/><path d=\"M12 20 L24 12 L36 20Z\" fill=\"#c8553d\"/> <path d=\"M20 39 v-7 a4 4 0 0 1 8 0 v7Z\" fill=\"#7a5238\"/><circle cx=\"24\" cy=\"24.5\" r=\"2.4\" fill=\"#8fc3cf\"/> <path d=\"M24 5 v6 M21.6 7.2 h4.8\" fill=\"none\"/><path d=\"M9.5 21 h3 M35.5 21 h3 M9.5 27 h3 M35.5 27 h3\" fill=\"none\"/><path d=\"M5 40 H43\" fill=\"none\"/>", "kiosk": "<path d=\"M9 22 Q24 4 39 22Z\" fill=\"#4a9f97\"/><path d=\"M14 18 Q24 9 34 18\" fill=\"none\" stroke=\"#e8f2ee\" stroke-width=\"1.3\"/> <rect x=\"9\" y=\"22\" width=\"30\" height=\"3.5\" fill=\"#f3e6cc\"/><path d=\"M13 25.5 v10.5 M20 25.5 v10.5 M28 25.5 v10.5 M35 25.5 v10.5\" fill=\"none\" stroke-width=\"2.3\"/> <rect x=\"7\" y=\"36\" width=\"34\" height=\"4.5\" fill=\"#ead2a8\"/><circle cx=\"24\" cy=\"5\" r=\"2\" fill=\"#d9a441\"/>", "library": "<path d=\"M7 18 L24 8 L41 18Z\" fill=\"#d98a62\"/><rect x=\"8\" y=\"18\" width=\"32\" height=\"3.5\" fill=\"#f3e6cc\"/> <path d=\"M12.5 21.5 v12.5 M18.5 21.5 v12.5 M29.5 21.5 v12.5 M35.5 21.5 v12.5\" fill=\"none\" stroke-width=\"2.3\"/> <path d=\"M21 33 v-8 h6 v8Z\" fill=\"#8fc3cf\"/><rect x=\"6\" y=\"34\" width=\"36\" height=\"5.5\" fill=\"#f3e6cc\"/><circle cx=\"24\" cy=\"14.5\" r=\"2\" fill=\"#f3e6cc\"/>", "museum": "<path d=\"M7 17 L24 7 L41 17Z\" fill=\"#9a83c4\"/><rect x=\"8\" y=\"17\" width=\"32\" height=\"3.5\" fill=\"#f3e6cc\"/> <path d=\"M12.5 20.5 v13.5 M35.5 20.5 v13.5\" fill=\"none\" stroke-width=\"2.3\"/> <path d=\"M20.5 23 h7 l-1 2.5 q4 3 1.5 8 h-8 q-2.5 -5 1.5 -8Z\" fill=\"#cf862c\"/><path d=\"M19.5 29 h9\" fill=\"none\" stroke=\"#f3e6cc\"/> <rect x=\"6\" y=\"34\" width=\"36\" height=\"5.5\" fill=\"#f3e6cc\"/>", "theater": "<path d=\"M6 11 h17 v10 a8.5 8.5 0 0 1 -17 0Z\" fill=\"#f3e6cc\"/><path d=\"M10 17 q2 -2 4 0 M15 17 q2 -2 4 0 M10.5 23 q4 4 8 0\" fill=\"none\"/> <path d=\"M24 19 h17 v10 a8.5 8.5 0 0 1 -17 0Z\" fill=\"#e2b955\"/><path d=\"M28 25 q2 2 4 0 M33 25 q2 2 4 0 M28.5 33 q4 -4 8 0\" fill=\"none\"/>", "whale": "<path d=\"M5 28 C5 18 26 16 33 24 L42 17 L40 26 L45 32 L35 29 C28 37 7 39 5 28Z\" fill=\"#5d86a3\"/> <path d=\"M8 31 C14 35 26 35 32 30\" fill=\"none\" stroke=\"#d6e6ef\" stroke-width=\"2\"/><circle cx=\"12.5\" cy=\"25\" r=\"1.4\" fill=\"#3b3632\" stroke=\"none\"/> <path d=\"M15 16 q-2 -4 -5 -5 M15 16 q0 -5 2 -8 M15 16 q2 -4 5 -4\" fill=\"none\" stroke=\"#8fc3cf\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>", "market": "<rect x=\"10\" y=\"22\" width=\"28\" height=\"17\" fill=\"#f3e6cc\"/><path d=\"M7 22 L11 11 H37 L41 22Z\" fill=\"#c8553d\"/> <path d=\"M17.5 11.5 L16 21.5 M24 11.5 V21.5 M30.5 11.5 L32 21.5\" stroke=\"#f3e6cc\" stroke-width=\"3\"/> <circle cx=\"18\" cy=\"31\" r=\"3.6\" fill=\"#d9a441\"/><circle cx=\"25\" cy=\"31\" r=\"3.6\" fill=\"#7fa36a\"/><circle cx=\"31.5\" cy=\"31.5\" r=\"3\" fill=\"#c8553d\"/>", "hotel": "<rect x=\"13\" y=\"9\" width=\"22\" height=\"31\" fill=\"#e3a08e\"/><path d=\"M13 9 h22 v4 h-22Z\" fill=\"#c8553d\"/> <path d=\"M17 17 h4 v4 h-4Z M27 17 h4 v4 h-4Z M17 25 h4 v4 h-4Z M27 25 h4 v4 h-4Z\" fill=\"#8fc3cf\"/><path d=\"M21 40 v-6 h6 v6\" fill=\"#f3e6cc\"/><path d=\"M8 40 H40\" fill=\"none\"/>", "beach": "<path d=\"M5 40 Q24 31 43 40 V43 H5Z\" fill=\"#ecd49a\"/><path d=\"M24 15 V37\" fill=\"none\" stroke-width=\"2\"/> <path d=\"M7 22 Q24 3 41 22 Q36.5 18 32.5 22 Q28.5 18 24 22 Q19.5 18 15.5 22 Q11.5 18 7 22Z\" fill=\"#d0603f\"/> <path d=\"M24 9 Q20 14 15.5 22 M24 9 Q28 14 32.5 22\" fill=\"none\" stroke=\"#f3e6cc\" stroke-width=\"1.4\"/><circle cx=\"39\" cy=\"9\" r=\"4\" fill=\"#e2b955\"/>", "hongo": "<path d=\"M20 39 C21.5 33 19.5 28 22 25 H27.5 C29 29 27 34 29.5 39Z\" fill=\"#cf9a6a\"/> <path d=\"M9 24.5 C9 13.5 39 11.5 40 22.5 C37 28 14 29 9 24.5Z\" fill=\"#a9673d\"/><path d=\"M14 20 Q22 15 33 18\" fill=\"none\" stroke=\"#dcae82\"/> <path d=\"M4 40 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "ferry": "<path d=\"M5 29 H43 L38 38 H10Z\" fill=\"#f3e6cc\"/><rect x=\"12\" y=\"20\" width=\"23\" height=\"9\" fill=\"#fffdf7\"/> <path d=\"M15 24.5 h2 M20 24.5 h2 M25 24.5 h2 M30 24.5 h2\" stroke-width=\"2.4\"/><rect x=\"26\" y=\"13\" width=\"5\" height=\"7\" fill=\"#c8553d\"/> <path d=\"M10 33.5 H38.5\" stroke=\"#4d7fa0\" stroke-width=\"2.6\"/><path d=\"M4 42 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "marina": "<path d=\"M24 7 V31\" fill=\"none\" stroke-width=\"2\"/><path d=\"M25.5 8 L38 30 H25.5Z\" fill=\"#fffdf7\"/><path d=\"M22.5 12 L11 30 H22.5Z\" fill=\"#e2b955\"/> <path d=\"M8 32 H40 L35 38.5 H13Z\" fill=\"#c8553d\"/><path d=\"M4 43 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "island": "<path d=\"M3 36 C9 27 37 25 45 36Z\" fill=\"#ecd49a\"/><path d=\"M8 34 C11 22 22 18 30 34Z\" fill=\"#b98455\"/> <path d=\"M33 34 C33.5 28 33.4 24 32 20\" fill=\"none\" stroke=\"#8a6a4a\" stroke-width=\"2.2\"/> <path d=\"M32 20 C29 17 25 18 24 21 C27 20 29.5 20 32 20Z M32 20 C33 16 36.5 15 39.5 16.5 C36.5 17 34 18.5 32 20Z M32 20 C35.5 19.5 38.5 22 38.5 25 C36.5 22.5 34.5 21 32 20Z\" fill=\"#6f9a5a\"/> <path d=\"M3 41 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "dunes": "<path d=\"M4 33 C11 19 20 20 26 29 C30 22 38 22 44 31 V38 H4Z\" fill=\"#ecd49a\"/> <circle cx=\"10\" cy=\"37\" r=\"4\" fill=\"#6f9a5a\"/><circle cx=\"17\" cy=\"38\" r=\"4.5\" fill=\"#86ad6c\"/><circle cx=\"25\" cy=\"38\" r=\"3.8\" fill=\"#6f9a5a\"/><circle cx=\"34\" cy=\"38\" r=\"4.4\" fill=\"#86ad6c\"/> <path d=\"M3 44 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "whaleshark": "<path d=\"M18 20 L22 11 L26 20Z\" fill=\"#5a7896\"/><path d=\"M3 27 C9 18 30 18 38 22 L45 14 L43 25 L46 34 L38 29 C30 34 9 35 3 27Z\" fill=\"#5a7896\"/> <g fill=\"#f3e6cc\" stroke=\"none\"><circle cx=\"14\" cy=\"23.5\" r=\"1.2\"/><circle cx=\"19\" cy=\"25\" r=\"1.2\"/><circle cx=\"24\" cy=\"23\" r=\"1.2\"/><circle cx=\"28\" cy=\"26\" r=\"1.2\"/><circle cx=\"32\" cy=\"24\" r=\"1.1\"/><circle cx=\"21\" cy=\"28.5\" r=\"1.1\"/><circle cx=\"26\" cy=\"29.5\" r=\"1.1\"/></g>", "caravel": "<path d=\"M6 30 H42 L36 39 H12Z\" fill=\"#8f6240\"/><path d=\"M25 6 V30 M15 13 V30\" fill=\"none\" stroke-width=\"1.8\"/> <path d=\"M25.6 9 Q35 16 25.6 25Z\" fill=\"#f3e6cc\"/><path d=\"M29 13.5 v7 M26.5 17 h5.5\" fill=\"none\" stroke=\"#c8553d\" stroke-width=\"1.8\"/> <path d=\"M15.6 15 Q22 20 15.6 26Z\" fill=\"#f3e6cc\"/><path d=\"M25 6 l6 2 -6 2\" fill=\"#c8553d\"/> <path d=\"M4 43 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "manta": "<path d=\"M24 11 C28 18 36 20 45 23 C36 26 30 30 24 35 C18 30 12 26 3 23 C12 20 20 18 24 11Z\" fill=\"#4f5f86\"/> <path d=\"M24 35 L24 45\" fill=\"none\"/><path d=\"M17 22 Q24 19 31 22\" fill=\"none\" stroke=\"#b9c6e6\" stroke-width=\"1.3\"/>", "palm": "<circle cx=\"35\" cy=\"13\" r=\"6.5\" fill=\"#e2b955\"/><path d=\"M22 40 C23 32 23 24 21 17\" fill=\"none\" stroke=\"#8a6a4a\" stroke-width=\"3.2\" stroke-linecap=\"round\"/> <path d=\"M21 17 C15 12 9 14 6.5 18.5 C12 16 16 16.6 21 17Z M21 17 C18 10 22 5.6 27.5 5.4 C24 8.6 22 12 21 17Z M21 17 C27 12 34 16 35.5 21.5 C30 18 26 17 21 17Z M21 17 C14 18 11 23 12 27.5 C15 22 18 19 21 17Z\" fill=\"#6f9a5a\"/> <path d=\"M5 42 q4.3 -3 8.6 0 t8.6 0 t8.6 0 t8.6 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "pin": "<path d=\"M24 6 C15 6 10 13 10 20 C10 30 24 42 24 42 C24 42 38 30 38 20 C38 13 33 6 24 6Z\" fill=\"#c0553a\"/><circle cx=\"24\" cy=\"20\" r=\"5.5\" fill=\"#fbf6ea\"/>", "cup": "<path d=\"M11 18 H33 V30 a9 9 0 0 1 -9 9 h-4 a9 9 0 0 1 -9 -9Z\" fill=\"#f3e6cc\"/><path d=\"M33 21 h3 a5 5 0 0 1 0 10 h-3\" fill=\"none\"/><path d=\"M17 8 q-2 3 0 6 M23 6 q-2 4 0 8 M29 8 q-2 3 0 6\" fill=\"none\" stroke=\"#8a6a4a\" stroke-linecap=\"round\"/><path d=\"M8 41 H38\" fill=\"none\"/><path d=\"M14 23 H30\" stroke=\"#a9673d\" stroke-width=\"3\"/>", "food": "<circle cx=\"24\" cy=\"26\" r=\"14\" fill=\"#f3e6cc\"/><circle cx=\"24\" cy=\"26\" r=\"9\" fill=\"#d26a45\"/><path d=\"M19 23 q5 -4 10 0 q-5 5 -10 0Z\" fill=\"#e2b955\"/><circle cx=\"21\" cy=\"29\" r=\"1.6\" fill=\"#6f9a5a\" stroke=\"none\"/><circle cx=\"27\" cy=\"29\" r=\"1.6\" fill=\"#6f9a5a\" stroke=\"none\"/><path d=\"M6 10 v10 M9 10 v10 M12 10 v10 M6 20 q3 3 6 0 M9 22 v18 M40 10 q-4 6 -1 13 h2 v17\" fill=\"none\" stroke-linecap=\"round\"/>", "kayak": "<path d=\"M4 30 C14 24 34 24 44 30 C34 35 14 35 4 30Z\" fill=\"#d9a441\"/><ellipse cx=\"24\" cy=\"29.5\" rx=\"6\" ry=\"2.4\" fill=\"#5b5048\"/><circle cx=\"24\" cy=\"20\" r=\"3.2\" fill=\"#e9c9a0\"/><path d=\"M24 23 v5\" fill=\"none\" stroke-width=\"2.2\"/><path d=\"M12 14 L36 34\" fill=\"none\" stroke-width=\"2\"/><path d=\"M9 11 l5 1 -1 4Z M39 37 l-5 -1 1 -4Z\" fill=\"#c8553d\"/><path d=\"M3 41 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "sealion": "<path d=\"M8 36 C10 26 18 18 26 16 C28 12 33 10 36 13 C39 16 37 20 34 21 C32 26 30 32 32 36Z\" fill=\"#9b7a5a\"/><circle cx=\"33\" cy=\"15\" r=\"1.2\" fill=\"#3b3632\" stroke=\"none\"/><path d=\"M37 16 l4 -1 M37 17.5 l4 1\" fill=\"none\" stroke-width=\"1.2\"/><path d=\"M14 36 l-5 4 M24 34 l3 6\" fill=\"none\" stroke-width=\"2\"/><path d=\"M3 42 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>"};
const BOATS = {"velero": "<svg viewBox=\"-68 -28 136 56\" aria-hidden=\"true\"><defs><linearGradient id=\"mlp-wk\" gradientUnits=\"userSpaceOnUse\" x1=\"-12\" y1=\"0\" x2=\"-64\" y2=\"0\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".85\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs><path d=\"M-12 -2.4 L-64 -21 M-12 2.4 L-64 21\" stroke=\"url(#mlp-wk)\" stroke-width=\"1.1\" fill=\"none\"/> <path d=\"M-11 0 L-60 0\" stroke=\"url(#mlp-wk)\" stroke-width=\"3.2\" opacity=\".55\" fill=\"none\" stroke-linecap=\"round\"/> <path d=\"M12.5 0 C10 -4.4 -7 -4.6 -11 -3.6 L-11 3.6 C-7 4.6 10 4.4 12.5 0Z\" fill=\"rgba(20,55,75,.25)\" transform=\"translate(1.4 1.8)\"/> <path d=\"M12.5 0 C10 -4.4 -7 -4.6 -11 -3.6 L-11 3.6 C-7 4.6 10 4.4 12.5 0Z\" fill=\"#fbfbf7\" stroke=\"#3b3632\" stroke-width=\".5\"/> <path d=\"M10 0 C8.2 -3.1 -6 -3.3 -9.6 -2.6 L-9.6 2.6 C-6 3.3 8.2 3.1 10 0Z\" fill=\"#cfa877\"/> <path d=\"M-9 -1.6 H6.5 M-9 -.55 H8.5 M-9 .55 H8.5 M-9 1.6 H6.5\" stroke=\"#a9845a\" stroke-width=\".22\"/> <rect x=\"-3.4\" y=\"-2.1\" width=\"7.6\" height=\"4.2\" rx=\"1.4\" fill=\"#f4f3ee\" stroke=\"#3b3632\" stroke-width=\".35\"/> <path d=\"M-2.4 -2.1 h1.4 M.4 -2.1 h1.4 M-2.4 2.1 h1.4 M.4 2.1 h1.4\" stroke=\"#33424f\" stroke-width=\".55\"/> <rect x=\"-9.4\" y=\"-1.9\" width=\"5\" height=\"3.8\" rx=\".9\" fill=\"#9b7d57\" stroke=\"#3b3632\" stroke-width=\".3\"/> <circle cx=\"-8.2\" cy=\"0\" r=\".9\" fill=\"none\" stroke=\"#3b3632\" stroke-width=\".35\"/> <path d=\"M12.6 0 L3.8 0\" stroke=\"#3b3632\" stroke-width=\".2\"/> <g class=\"jib\"><path d=\"M12 0 C9.4 -1.7 6.4 -1.9 4 -.7 L4 .05 C6.4 -.45 9.4 -.35 12 0Z\" fill=\"#fff\" stroke=\"#3b3632\" stroke-width=\".3\"/></g> <g class=\"main\"><path d=\"M3.6 -.2 C.2 -2.4 -5 -2.5 -9.2 -.5 L-9.2 .25 C-5 -.9 .2 -.7 3.6 .25Z\" fill=\"#ffffff\" stroke=\"#3b3632\" stroke-width=\".32\"/><path d=\"M3.6 0 L-9.2 0\" stroke=\"#7b6f63\" stroke-width=\".35\"/></g> <circle cx=\"3.6\" cy=\"0\" r=\".55\" fill=\"#3b3632\"/></svg>", "cata": "<svg viewBox=\"-68 -28 136 56\" aria-hidden=\"true\"><defs><linearGradient id=\"mlp-wk\" gradientUnits=\"userSpaceOnUse\" x1=\"-12\" y1=\"0\" x2=\"-64\" y2=\"0\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".85\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs><path d=\"M-13 -6.5 L-66 -26 M-13 6.5 L-66 26\" stroke=\"url(#mlp-wk)\" stroke-width=\"1.1\" fill=\"none\"/> <path d=\"M-13 -5 L-58 -5 M-13 5 L-58 5\" stroke=\"url(#mlp-wk)\" stroke-width=\"2.6\" opacity=\".5\" fill=\"none\" stroke-linecap=\"round\"/> <g transform=\"translate(1.6 2)\" fill=\"rgba(20,55,75,.25)\"><path d=\"M14 -5 C12 -7.4 -10 -7.6 -13 -6.8 L-13 -3.2 C-10 -2.4 12 -2.6 14 -5Z M14 5 C12 2.6 -10 2.4 -13 3.2 L-13 6.8 C-10 7.6 12 7.4 14 5Z\"/><rect x=\"-12\" y=\"-4.6\" width=\"17\" height=\"9.2\"/></g> <path d=\"M14 -5 C12 -7.4 -10 -7.6 -13 -6.8 L-13 -3.2 C-10 -2.4 12 -2.6 14 -5Z M14 5 C12 2.6 -10 2.4 -13 3.2 L-13 6.8 C-10 7.6 12 7.4 14 5Z\" fill=\"#fbfbf7\" stroke=\"#3b3632\" stroke-width=\".5\"/> <rect x=\"5\" y=\"-3.6\" width=\"7\" height=\"7.2\" fill=\"#e9e3d2\" stroke=\"#3b3632\" stroke-width=\".3\"/> <path d=\"M6 -3.6 V3.6 M7.2 -3.6 V3.6 M8.4 -3.6 V3.6 M9.6 -3.6 V3.6 M10.8 -3.6 V3.6 M5 -2.4 H12 M5 -1.2 H12 M5 0 H12 M5 1.2 H12 M5 2.4 H12\" stroke=\"#9a907c\" stroke-width=\".16\"/> <rect x=\"-12.2\" y=\"-4.8\" width=\"17.4\" height=\"9.6\" rx=\"1.6\" fill=\"#f4f3ee\" stroke=\"#3b3632\" stroke-width=\".45\"/> <rect x=\"-6.5\" y=\"-3.8\" width=\"9.5\" height=\"7.6\" rx=\"2\" fill=\"#e6e9ea\" stroke=\"#3b3632\" stroke-width=\".35\"/> <path d=\"M2.2 -3.2 V3.2\" stroke=\"#33424f\" stroke-width=\"1.1\"/> <path d=\"M-12 -2.2 H-8.5 M-12 0 H-8.5 M-12 2.2 H-8.5\" stroke=\"#b9ad97\" stroke-width=\".3\"/> <g class=\"main\"><path d=\"M3.8 -.2 C.4 -2.6 -6.2 -2.7 -11.4 -.5 L-11.4 .25 C-6.2 -1 .4 -.8 3.8 .25Z\" fill=\"#fff\" stroke=\"#3b3632\" stroke-width=\".32\"/><path d=\"M3.8 0 L-11.4 0\" stroke=\"#7b6f63\" stroke-width=\".35\"/></g> <circle cx=\"3.8\" cy=\"0\" r=\".6\" fill=\"#3b3632\"/></svg>"};

const DEFAULTS = {
  tiles: 'https://tiles.openfreemap.org/planet',
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  geocoderUrl: 'https://photon.komoot.io/api/',
  bounds: [[-110.78, 23.95], [-109.95, 24.75]],
  lang: 'es', geocoder: true, pitch3d: true
};
const UI = {
  es: { sub: 'Baja California Sur · mapa interactivo', q: 'Buscar lugares, calles, direcciones…', list: 'Lugares', people: 'Personajes e historia',
    refs: 'Relacionado', photos: 'Fotos', none: 'Sin resultados', person: 'Personaje', street: 'Calle', address: 'Dirección',
    hint: 'Acércate para ver calles y edificios', go: 'Cómo llegar', verify: 'Ubicación aproximada', N: 'N', O: 'O',
    err: 'No se pudieron cargar los lugares.', zin: 'Acercar', zout: 'Alejar', home: 'Vista inicial', tilt: 'Vista 3D', fs: 'Pantalla completa', north: 'Norte', rec: 'Recomendado', recs: 'Recomendados', near: 'Cerca de mí', nearTitle: 'Recomendados cerca de ti', notHere: 'No pareces estar en La Paz: te mostramos lo recomendado cerca del centro.', geoErr: 'No pudimos obtener tu ubicación. Revisa el permiso de ubicación del navegador.', nearToast: 'Cerca de ti', contact: 'Contacto', social: 'Redes sociales', book: 'Reservar', hours: 'Horario', web: 'Sitio web', call: 'Llamar', example: 'Ejemplo', youHere: 'Estás aquí', noneNear: 'No hay lugares recomendados a menos de 3 km.', adj: 'Modo ajuste', adjHelp: 'Arrastra los medallones a su lugar exacto. Toca el mapa para ver coordenadas.', adjCopy: 'Copiar cambios', adjDl: 'Descargar lugares.json', adjBoats: 'Rutas de barcos', adjCopied: 'Cambios copiados', adjNone: 'Sin cambios todavía', adjChanged: 'cambios', copy: 'Copiar' },
  en: { sub: 'Baja California Sur · interactive map', q: 'Search places, streets, addresses…', list: 'Places', people: 'People & history',
    refs: 'Related', photos: 'Photos', none: 'No results', person: 'Person', street: 'Street', address: 'Address',
    hint: 'Zoom in to see streets and buildings', go: 'Directions', verify: 'Approximate location', N: 'N', O: 'W',
    err: 'Places could not be loaded.', zin: 'Zoom in', zout: 'Zoom out', home: 'Home view', tilt: '3D view', fs: 'Full screen', north: 'North', rec: 'Recommended', recs: 'Recommended', near: 'Near me', nearTitle: 'Recommended near you', notHere: 'You don’t seem to be in La Paz: here are recommendations near downtown.', geoErr: 'We couldn’t get your location. Check the browser’s location permission.', nearToast: 'Near you', contact: 'Contact', social: 'Social media', book: 'Book', hours: 'Hours', web: 'Website', call: 'Call', example: 'Example', youHere: 'You are here', noneNear: 'No recommended places within 3 km.', adj: 'Adjust mode', adjHelp: 'Drag the medallions to their exact spot. Tap the map to see coordinates.', adjCopy: 'Copy changes', adjDl: 'Download lugares.json', adjBoats: 'Boat routes', adjCopied: 'Changes copied', adjNone: 'No changes yet', adjChanged: 'changes', copy: 'Copy' }
};
const PAL = { roof: ['#c8553d', '#b5482f', '#d26a45', '#d9a441', '#e2b98a', '#3f8f8c', '#efe9dc', '#cf7558'] };

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const icon = id => `<svg viewBox="0 0 48 48" aria-hidden="true"><g stroke="#3b3632" stroke-width="1.6" stroke-linejoin="round">${ICONS[id] || ICONS.pin}</g></svg>`;
const SVG = {
  sun: '<svg viewBox="0 0 40 40"><g stroke="#3b3632" stroke-width="1.8"><circle cx="20" cy="17" r="8" fill="#e2b955"/><path d="M20 3v3M20 28v3M6 17h3M31 17h3M10 7l2 2M28 25l2 2M30 7l-2 2M12 25l-2 2" stroke-linecap="round"/></g><path d="M3 35q4-3 8.5 0t8.5 0t8.5 0t8.5 0" fill="none" stroke="#2f93a3" stroke-width="2.6" stroke-linecap="round"/></svg>',
  mag: '<svg class="mlp-mag" viewBox="0 0 24 24" fill="none" stroke="#3b3632" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>',
  plus: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="#3b3632" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" fill="#e2b955"/></svg>',
  list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor"/></svg>',
  loc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4" fill="#2f93a3" stroke="none"/><circle cx="12" cy="12" r="7.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  fs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  compass: '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="#fbf6ea" stroke="#5b5048" stroke-width="2"/><circle cx="30" cy="30" r="22" fill="none" stroke="#5b5048" stroke-width=".8" stroke-dasharray="2 3"/><path d="M30 7 L35.5 30 L30 53 L24.5 30Z" fill="#fbf6ea" stroke="#5b5048" stroke-width="1.6" stroke-linejoin="round"/><path d="M30 7 L35.5 30 L24.5 30Z" fill="#c0553a" stroke="#5b5048" stroke-width="1.6" stroke-linejoin="round"/><text x="30" y="21" text-anchor="middle" font-family="Kalam,cursive" font-weight="700" font-size="9" fill="#fff">N</text></svg>'
};

/* ======================= estilo del mapa ======================= */
function nameExpr(lang) { return ['coalesce', ['get', 'name:' + lang], ['get', 'name:latin'], ['get', 'name']]; }
function buildStyle(cfg) {
  const nm = nameExpr(cfg.lang);
  const z = (...stops) => ['interpolate', ['exponential', 1.5], ['zoom'], ...stops];
  const cls = (...v) => ['match', ['get', 'class'], v, true, false];
  const roadW = (s) => z(10, .5 * s, 13, 1.2 * s, 16, 5 * s, 19, 22 * s);
  const roofColor = ['match', ['%', ['abs', ['to-number', ['id'], 0]], 8], 0, PAL.roof[0], 1, PAL.roof[1], 2, PAL.roof[2], 3, PAL.roof[3], 4, PAL.roof[4], 5, PAL.roof[5], 6, PAL.roof[6], PAL.roof[7]];
  const label = { 'text-color': '#4a4038', 'text-halo-color': '#f3ead6', 'text-halo-width': 1.6, 'text-halo-blur': .4 };
  return {
    version: 8, glyphs: cfg.glyphs,
    sources: { omt: { type: 'vector', url: cfg.tiles, attribution: '© <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' } },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': '#efe3c4' } },
      { id: 'lc-sand', type: 'fill', source: 'omt', 'source-layer': 'landcover', filter: cls('sand', 'beach'), paint: { 'fill-color': '#ecd49a' } },
      { id: 'lc-veg', type: 'fill', source: 'omt', 'source-layer': 'landcover', filter: cls('wood', 'grass', 'scrub', 'farmland', 'forest'), paint: { 'fill-color': '#d3dcae', 'fill-opacity': .75 } },
      { id: 'lc-wet', type: 'fill', source: 'omt', 'source-layer': 'landcover', filter: cls('wetland'), paint: { 'fill-color': '#bcd6b8' } },
      { id: 'lu-res', type: 'fill', source: 'omt', 'source-layer': 'landuse', filter: cls('residential', 'suburb', 'neighbourhood', 'quarter'), paint: { 'fill-color': '#eadab8', 'fill-opacity': .8 } },
      { id: 'lu-other', type: 'fill', source: 'omt', 'source-layer': 'landuse', filter: cls('commercial', 'retail', 'industrial', 'school', 'university', 'hospital', 'stadium', 'pitch', 'cemetery'), paint: { 'fill-color': '#e6d0ad', 'fill-opacity': .7 } },
      { id: 'park', type: 'fill', source: 'omt', 'source-layer': 'park', paint: { 'fill-color': '#b9d09a', 'fill-opacity': .85, 'fill-outline-color': '#6f8a5a' } },
      { id: 'aeroway', type: 'fill', source: 'omt', 'source-layer': 'aeroway', filter: ['==', ['geometry-type'], 'Polygon'], paint: { 'fill-color': '#e5d8bd' } },
      { id: 'water-beach', type: 'line', source: 'omt', 'source-layer': 'water', paint: { 'line-color': '#ecd49a', 'line-width': z(9, 1.5, 14, 4, 18, 14) } },
      { id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-color': '#9fd3d2' } },
      { id: 'water-shallow', type: 'line', source: 'omt', 'source-layer': 'water', paint: { 'line-color': '#c8e9e2', 'line-width': z(9, 3, 14, 10, 18, 40), 'line-blur': z(9, 2, 14, 7, 18, 26), 'line-offset': z(9, 1.5, 14, 5, 18, 20), 'line-opacity': .9 } },
      { id: 'water-hatch', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-pattern': 'mlp-hatch-water', 'fill-opacity': .85 } },
      { id: 'water-line', type: 'line', source: 'omt', 'source-layer': 'water', paint: { 'line-color': '#5b5048', 'line-width': z(9, .8, 16, 1.4), 'line-opacity': .85 } },
      { id: 'waterway', type: 'line', source: 'omt', 'source-layer': 'waterway', paint: { 'line-color': '#8fc3c4', 'line-width': z(10, .5, 16, 2.5) } },
      // calles: borde y relleno
      { id: 'road-path', type: 'line', source: 'omt', 'source-layer': 'transportation', minzoom: 14, filter: cls('path', 'track', 'pedestrian', 'footway'), layout: { 'line-cap': 'round' }, paint: { 'line-color': '#8a8172', 'line-width': z(14, .6, 18, 2), 'line-dasharray': [2, 1.5] } },
      { id: 'road-minor-case', type: 'line', source: 'omt', 'source-layer': 'transportation', minzoom: 12.5, filter: cls('minor', 'service', 'street', 'residential', 'living_street', 'raceway'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#8a8172', 'line-width': roadW(1.1) } },
      { id: 'road-mid-case', type: 'line', source: 'omt', 'source-layer': 'transportation', filter: cls('secondary', 'tertiary'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#7d7266', 'line-width': roadW(1.6) } },
      { id: 'road-major-case', type: 'line', source: 'omt', 'source-layer': 'transportation', filter: cls('motorway', 'trunk', 'primary'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#6f6458', 'line-width': roadW(2.1) } },
      { id: 'road-minor', type: 'line', source: 'omt', 'source-layer': 'transportation', minzoom: 12.5, filter: cls('minor', 'service', 'street', 'residential', 'living_street', 'raceway'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#fbf7ee', 'line-width': roadW(.8) } },
      { id: 'road-mid', type: 'line', source: 'omt', 'source-layer': 'transportation', filter: cls('secondary', 'tertiary'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#fbf3dc', 'line-width': roadW(1.25) } },
      { id: 'road-major', type: 'line', source: 'omt', 'source-layer': 'transportation', filter: cls('motorway', 'trunk', 'primary'), layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#f3dfae', 'line-width': roadW(1.7) } },
      // edificios: planos con contorno a lápiz, y en relieve al acercarse
      { id: 'building', type: 'fill', source: 'omt', 'source-layer': 'building', minzoom: 13.5, paint: { 'fill-color': roofColor, 'fill-opacity': z(13.5, .5, 15, .95), 'fill-outline-color': '#3d3934' } },
      { id: 'building-3d', type: 'fill-extrusion', source: 'omt', 'source-layer': 'building', minzoom: 15, paint: {
        'fill-extrusion-color': roofColor,
        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.6, ['max', ['coalesce', ['get', 'render_height'], 5], 4]],
        'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
        'fill-extrusion-opacity': .92, 'fill-extrusion-vertical-gradient': true } },
      // textos
      { id: 'water-name', type: 'symbol', source: 'omt', 'source-layer': 'water_name', filter: ['==', ['geometry-type'], 'Point'], layout: { 'text-field': nm, 'text-font': ['Noto Sans Italic'], 'text-size': z(9, 11, 14, 15), 'text-letter-spacing': .25, 'text-max-width': 8 }, paint: { 'text-color': '#2f6f80', 'text-halo-color': 'rgba(200,235,235,.85)', 'text-halo-width': 1.4 } },
      { id: 'water-name-line', type: 'symbol', source: 'omt', 'source-layer': 'water_name', filter: ['==', ['geometry-type'], 'LineString'], layout: { 'text-field': nm, 'text-font': ['Noto Sans Italic'], 'text-size': z(9, 11, 14, 15), 'text-letter-spacing': .25, 'symbol-placement': 'line' }, paint: { 'text-color': '#2f6f80', 'text-halo-color': 'rgba(200,235,235,.85)', 'text-halo-width': 1.4 } },
      { id: 'road-name', type: 'symbol', source: 'omt', 'source-layer': 'transportation_name', minzoom: 13.5, layout: { 'text-field': nm, 'text-font': ['Noto Sans Italic'], 'text-size': z(13.5, 9.5, 17, 12.5, 19, 15), 'symbol-placement': 'line', 'symbol-spacing': 260, 'text-max-angle': 35, 'text-padding': 2 }, paint: label },
      { id: 'housenumber', type: 'symbol', source: 'omt', 'source-layer': 'housenumber', minzoom: 17.5, layout: { 'text-field': ['get', 'housenumber'], 'text-font': ['Noto Sans Regular'], 'text-size': 10 }, paint: { 'text-color': '#7d7266', 'text-halo-color': '#f3ead6', 'text-halo-width': 1 } },
      { id: 'place-small', type: 'symbol', source: 'omt', 'source-layer': 'place', minzoom: 12, filter: cls('suburb', 'neighbourhood', 'quarter', 'hamlet', 'village', 'isolated_dwelling'), layout: { 'text-field': nm, 'text-font': ['Noto Sans Bold'], 'text-size': z(12, 10, 16, 13), 'text-transform': 'uppercase', 'text-letter-spacing': .15, 'text-max-width': 7 }, paint: { 'text-color': '#6b5236', 'text-halo-color': '#f3ead6', 'text-halo-width': 1.6 } },
      { id: 'place-city', type: 'symbol', source: 'omt', 'source-layer': 'place', maxzoom: 14, filter: cls('city', 'town'), layout: { 'text-field': nm, 'text-font': ['Noto Sans Bold'], 'text-size': z(8, 14, 12, 24), 'text-letter-spacing': .12 }, paint: { 'text-color': '#c0553a', 'text-halo-color': '#f3ead6', 'text-halo-width': 2 } }
    ]
  };
}
function hatchImage(color, gap, angleDeg) {
  const pr = 2, size = 16, c = document.createElement('canvas'); c.width = c.height = size * pr;
  const g = c.getContext('2d'); g.scale(pr, pr); g.strokeStyle = color; g.lineWidth = .9;
  // líneas diagonales que encajan al repetirse
  for (let k = -size; k <= size * 2; k += gap) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k - size, size); g.stroke(); }
  return { width: size * pr, height: size * pr, data: new Uint8Array(g.getImageData(0, 0, size * pr, size * pr).data.buffer) };
}

/* ======================= utilidades geo ======================= */
const R2D = 180 / Math.PI;
function mPerDeg(lat) { return [111320 * Math.cos(lat / R2D), 110540]; }
function bearing(a, b) { const m = mPerDeg(a[1]); return Math.atan2((b[0] - a[0]) * m[0], (b[1] - a[1]) * m[1]) * R2D; }
function distM(a, b) { const m = mPerDeg(a[1]); return Math.hypot((b[0] - a[0]) * m[0], (b[1] - a[1]) * m[1]); }
function angDiff(a, b) { let d = b - a; while (d > 180) d -= 360; while (d < -180) d += 360; return d; }

/* ======================= instancia ======================= */
function init(root) {
  if (root.__mlp) return; root.__mlp = true;
  if (!window.maplibregl) { root.textContent = 'MapLibre no está cargado.'; return; }
  let cfg = {}; try { cfg = JSON.parse(root.getAttribute('data-config') || '{}'); } catch (e) {}
  cfg = Object.assign({}, DEFAULTS, cfg);
  let lang = cfg.lang === 'en' ? 'en' : 'es';
  const $ = s => root.querySelector(s);

  root.innerHTML = `
    <div class="mlp-map"></div>
    <div class="mlp-head">
      <div class="mlp-toprow">
        <div class="mlp-brand mlp-panel">${SVG.sun}<div><b>La Paz</b><small class="mlp-subtitle"></small></div></div>
        <div class="mlp-spacer"></div>
        <div class="mlp-lang mlp-panel"><button data-l="es">ES</button><button data-l="en">EN</button></div>
      </div>
      <div class="mlp-search">${SVG.mag}<input type="search" autocomplete="off" aria-label="Buscar"><div class="mlp-results mlp-panel"></div></div>
      <div class="mlp-chips"></div>
    </div>
    <div class="mlp-controls">
      <button data-a="in">${SVG.plus}</button><button data-a="out">${SVG.minus}</button>
      <button data-a="home">${SVG.home}</button><button data-a="tilt">3D</button>
      <button data-a="list">${SVG.list}</button><button data-a="near">${SVG.loc}</button><button data-a="fs">${SVG.fs}</button>
    </div>
    <button class="mlp-compass">${SVG.compass}</button>
    <div class="mlp-scrim"></div><div class="mlp-card"></div>
    <div class="mlp-list"><div class="mlp-lh"><b></b><button aria-label="×">×</button></div><div class="mlp-lb"></div></div>`;

  const map = new maplibregl.Map({
    container: $('.mlp-map'), style: buildStyle(Object.assign({}, cfg, { lang })),
    center: [-110.33, 24.23], zoom: 11.3, minZoom: 9, maxZoom: 19.5, maxBounds: cfg.bounds,
    attributionControl: { compact: true }, dragRotate: true, pitchWithRotate: true, maxPitch: 60
  });
  map.touchZoomRotate.enableRotation();
  map.addControl(new maplibregl.ScaleControl({ unit: 'metric', maxWidth: 90 }), 'bottom-left');
  map.on('styleimagemissing', e => { if (e.id === 'mlp-hatch-water') map.addImage(e.id, hatchImage('rgba(30,95,125,.28)', 4.5), { pixelRatio: 2 }); });
  // texturas de papel dentro del lienzo, por debajo de los marcadores
  const cc = map.getCanvasContainer();
  ['mlp-hatch', 'mlp-paper'].forEach(c => { const d = document.createElement('div'); d.className = 'mlp-tex ' + c; cc.appendChild(d); });

  const ro = new ResizeObserver(() => { root.classList.toggle('mlp-wide', root.clientWidth >= 820); map.resize(); });
  ro.observe(root);

  let DATA = null, PLACES = [], PEOPLE = {}, CATS = {}, byId = {}, activeId = null;
  const activeCats = new Set();
  const STREETS = new Map();
  let use3d = !!cfg.pitch3d;

  /* ---------- datos ---------- */
  fetch(cfg.dataUrl, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    DATA = d; CATS = d.categorias || {}; Object.keys(CATS).forEach(k => activeCats.add(k));
    (d.personajes || []).forEach(p => PEOPLE[p.id] = p);
    PLACES = (d.lugares || []).filter(p => Array.isArray(p.coordenadas)).map((p, i) => normPlace(p, i));
    PLACES.forEach(p => byId[p.id] = p);
    Object.keys(CATS).forEach(k => root.style.setProperty('--' + k, CATS[k].color || '#8a8172'));
    buildMarkers(); setLang(lang); homeView(false); if (ADJUST) renderAdjust();
    map.once('load', () => startBoats(d.barcos || []));
    if (map.loaded()) startBoats(d.barcos || []);
  }).catch(err => { console.error('[mapa-lapaz]', err); toast(UI[lang].err, 5000); setLang(lang); });

  const LEVELS = ['basico', 'destacado', 'sobresaliente'];
  function normPlace(p, i) {
    const o = Object.assign({ num: i + 1, prioridad: 2, nivel: 'destacado', referencias: [], personajes: [], fotos: [], enlaces: [], contacto: {}, redes: {} }, p);
    if (!LEVELS.includes(o.nivel)) o.nivel = 'basico';
    o._w = o.prioridad - (o.nivel === 'sobresaliente' ? .5 : 0);
    return o;
  }
  const ADJUST = !!cfg.adjust || /[?&]ajustar\b/.test(location.search);
  let onlyRec = false;
  const adjChanged = new Set();
  /* ---------- marcadores ---------- */
  function buildMarkers() {
    PLACES.forEach(p => {
      const el = document.createElement('div'); el.className = 'mlp-mk lv-' + p.nivel + (p.verificar ? ' is-approx' : ''); el.style.setProperty('--c', `var(--${p.categoria})`);
      el.innerHTML = `<div class="mlp-stem"></div><div class="mlp-pin"></div><div class="mlp-medal">${icon(p.icono)}<b class="mlp-num">${p.num}</b>${p.nivel === 'sobresaliente' ? '<b class="mlp-star" aria-hidden="true">★</b>' : ''}</div><div class="mlp-lbl"></div>`;
      el.addEventListener('click', e => { e.stopPropagation(); if (el._dragged) { el._dragged = false; return; } openCard(p.id, null, !ADJUST); });
      p.el = el; p.marker = new maplibregl.Marker({ element: el, anchor: 'center', draggable: ADJUST }).setLngLat(p.coordenadas).addTo(map);
      if (ADJUST) {
        p.marker.on('dragstart', () => { el._dragged = true; });
        p.marker.on('dragend', () => { const ll = p.marker.getLngLat(); p.coordenadas = [+ll.lng.toFixed(5), +ll.lat.toFixed(5)]; adjChanged.add(p.id); el.classList.remove('is-approx'); renderAdjust(); });
      }
    });
  }
  let ovRaf = 0;
  const scheduleOverlay = () => { if (!ovRaf) ovRaf = requestAnimationFrame(() => { ovRaf = 0; updateOverlay(); }); };
  function updateOverlay() {
    const zz = map.getZoom(), boxes = [], W = root.clientWidth, H = root.clientHeight;
    const lvl = zz < 12.6 ? 1 : zz < 14.6 ? 2 : 3;
    const order = PLACES.slice().sort((a, b) => a._w - b._w || a.num - b.num);
    for (const p of order) {
      if (!p.el) continue;
      const pt = map.project(p.coordenadas); let mode = 'full';
      const want = lvl === 3 || (lvl === 2 && p.prioridad <= 2) || (lvl === 1 && p.prioridad === 1);
      if (!activeCats.has(p.categoria) || (onlyRec && p.nivel !== 'sobresaliente') || pt.x < -220 || pt.x > W + 60 || pt.y < -30 || pt.y > H + 90) mode = 'none';
      else {
        const lw = p._lw || (p._lw = (p.nombre[lang] || '').length * 6.7 + 22);
        const box = [pt.x - 24, pt.y - 66, pt.x + 30 + lw, pt.y - 36];
        if (ADJUST) { /* en modo ajuste se ven todos */ }
        else if (!want && p.id !== activeId) mode = lvl === 1 ? 'none' : 'dot';
        else if (p.id !== activeId && boxes.some(b => !(box[2] < b[0] || box[0] > b[2] || box[3] < b[1] || box[1] > b[3]))) mode = 'dot';
        else boxes.push(box);
      }
      const cls = 'm-' + mode + (p.id === activeId ? ' active' : '');
      if (p._c !== cls) { p.el.classList.remove('m-full', 'm-dot', 'm-none', 'active'); cls.split(' ').forEach(c => p.el.classList.add(c)); p._c = cls; }
      p.el.parentElement && (p.el.style.zIndex = p.id === activeId ? 9999 : Math.round(pt.y));
    }
  }
  map.on('move', scheduleOverlay); map.on('resize', scheduleOverlay);
  map.on('rotate', () => { $('.mlp-compass svg').style.transform = `rotate(${-map.getBearing()}deg)`; });

  /* ---------- ficha ---------- */
  const card = $('.mlp-card');
  function openCard(id, personId, fly) {
    const p = byId[id]; if (!p) return; activeId = id; const L = UI[lang];
    const cat = CATS[p.categoria] || {}, lv = p.nivel, rank = LEVELS.indexOf(lv);
    const t = v => v == null ? '' : (typeof v === 'object' ? (v[lang] || v.es || '') : String(v));
    const ppl = (p.personajes || []).map(k => PEOPLE[k]).filter(Boolean).map(q => `<div class="mlp-person" data-pid="${esc(q.id)}"><div class="mlp-av">${esc(q.iniciales || '')}</div><div><b>${esc(t(q.nombre))}</b><em>${esc(t(q.epoca))}</em><div>${esc(t(q.descripcion))}</div></div></div>`).join('');
    const refs = (p.referencias || []).map(k => byId[k]).filter(Boolean).map(r => `<button class="mlp-ref" data-ref="${esc(r.id)}" style="--c:var(--${r.categoria})"><span class="mlp-ic">${icon(r.icono)}</span>${esc(t(r.nombre))}</button>`).join('');
    const maxPhotos = rank === 2 ? 12 : rank === 1 ? 4 : 0;
    const fotos = (p.fotos || []).filter(f => f && f.url).slice(0, maxPhotos).map(f => `<figure><img src="${esc(f.url)}" alt="${esc(f.alt || t(p.nombre))}" loading="lazy">${f.credito ? `<figcaption>${esc(f.credito)}</figcaption>` : ''}</figure>`).join('');
    const c = p.contacto || {}, contact = rank >= 1 ? [
      c.telefono && `<a class="mlp-btn" href="tel:${esc(String(c.telefono).replace(/[^+\d]/g, ''))}">☎ ${esc(c.telefono)}</a>`,
      c.whatsapp && `<a class="mlp-btn" href="https://wa.me/${esc(String(c.whatsapp).replace(/\D/g, ''))}" target="_blank" rel="noopener">WhatsApp</a>`,
      c.email && `<a class="mlp-btn" href="mailto:${esc(c.email)}">✉ ${esc(c.email)}</a>`,
      c.web && `<a class="mlp-btn" href="${esc(c.web)}" target="_blank" rel="noopener">🌐 ${L.web}</a>`].filter(Boolean).join('') : '';
    const NETS = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', x: 'X', youtube: 'YouTube', tripadvisor: 'Tripadvisor' };
    const social = rank === 2 ? Object.keys(NETS).filter(k => p.redes && p.redes[k]).map(k => `<a class="mlp-btn mlp-net" href="${esc(p.redes[k])}" target="_blank" rel="noopener">${NETS[k]}</a>`).join('') : '';
    const links = rank === 2 ? (p.enlaces || []).filter(l => l && l.url).map(l => `<a class="mlp-btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(t(l.titulo) || l.url)}</a>`).join('') : '';
    const book = rank === 2 && p.reservar && p.reservar.url ? `<a class="mlp-btn primary mlp-book" href="${esc(p.reservar.url)}" target="_blank" rel="noopener">📅 ${esc(t(p.reservar.texto) || L.book)}</a>` : '';
    const desc = rank === 0 ? (t(p.descripcion_breve) || t(p.descripcion).split(/(?<=\.)\s/)[0]) : t(p.descripcion);
    const hours = rank >= 1 && p.horario ? `<div class="mlp-addr">🕑 ${esc(t(p.horario))}</div>` : '';
    const [lon, lat] = p.coordenadas;
    const hero = rank >= 1 && p.fotos && p.fotos[0] && p.fotos[0].url ? ` has-photo" style="background-image:url('${esc(p.fotos[0].url)}')` : '';
    card.style.setProperty('--c', `var(--${p.categoria})`);
    card.classList.remove('lv-basico', 'lv-destacado', 'lv-sobresaliente'); card.classList.add('lv-' + lv);
    card.innerHTML = `<div class="mlp-hero${hero}"><button class="mlp-x" aria-label="×">×</button><div class="mlp-disc">${icon(p.icono)}</div>${rank === 2 ? `<span class="mlp-recbadge">★ ${L.rec}</span>` : ''}</div>
      <div class="mlp-body"><span class="mlp-tag">${p.num} · ${esc(t(cat))}</span>${p.ejemplo ? ` <span class="mlp-tag mlp-ex">${L.example}</span>` : ''}<h2>${esc(t(p.nombre))}</h2>
      ${p.direccion ? `<div class="mlp-addr">📍 ${esc(t(p.direccion))}</div>` : ''}${hours}
      <p>${esc(desc)}</p>
      ${book ? `<div class="mlp-actions">${book}</div>` : ''}
      ${fotos ? `<h3>${L.photos}</h3><div class="mlp-photos">${fotos}</div>` : ''}
      ${contact ? `<h3>${L.contact}</h3><div class="mlp-actions">${contact}</div>` : ''}
      ${social ? `<h3>${L.social}</h3><div class="mlp-actions">${social}</div>` : ''}
      ${ppl ? `<h3>${L.people}</h3>${ppl}` : ''}
      ${refs ? `<h3>${L.refs}</h3><div class="mlp-refs">${refs}</div>` : ''}
      <div class="mlp-actions"><a class="mlp-btn primary" href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}" target="_blank" rel="noopener">➜ ${L.go}</a>${links}</div>
      <div class="mlp-coords">${lat.toFixed(5)}° ${L.N}, ${Math.abs(lon).toFixed(5)}° ${L.O}</div>
      ${p.verificar && !adjChanged.has(p.id) ? `<div class="mlp-warn">≈ ${L.verify}</div>` : ''}</div>`;
    card.querySelector('.mlp-x').onclick = closeCard;
    card.querySelectorAll('[data-ref]').forEach(b => b.onclick = () => openCard(b.dataset.ref, null, true));
    card.classList.add('open');
    if (personId) { const el = card.querySelector(`[data-pid="${personId}"]`); if (el) { el.classList.add('hl'); setTimeout(() => el.scrollIntoView({ block: 'center', behavior: 'smooth' }), 400); } }
    if (fly) flyToPlace(p);
    scheduleOverlay();
  }
  function flyToPlace(p) {
    const wide = root.classList.contains('mlp-wide'), H = root.clientHeight;
    const zz = p.zoom || 16;
    map.flyTo({ center: p.coordenadas, zoom: zz, pitch: use3d && zz >= 15.5 ? 50 : 0, bearing: map.getBearing(), offset: wide ? [-190, 20] : [0, -H * .14], speed: 1.1, curve: 1.5, essential: true });
  }
  function closeCard() { card.classList.remove('open'); activeId = null; scheduleOverlay(); }
  map.on('click', () => { if (card.classList.contains('open')) closeCard(); });

  /* ---------- búsqueda ---------- */
  const q = $('.mlp-search input'), res = $('.mlp-results');
  let hits = [], sel = 0, geoHits = [], geoTimer = 0, geoCtl = null, lastGeo = '';
  function collectStreets() {
    try {
      map.querySourceFeatures('omt', { sourceLayer: 'transportation_name' }).forEach(f => {
        const n = f.properties && (f.properties['name:' + lang] || f.properties.name); if (!n || STREETS.has(n)) return;
        let c = f.geometry.coordinates; while (Array.isArray(c[0])) c = c[Math.floor(c.length / 2)];
        if (typeof c[0] === 'number') STREETS.set(n, c);
      });
    } catch (e) {}
  }
  map.on('idle', collectStreets);
  function render() {
    const L = UI[lang];
    const all = hits.concat(geoHits.filter(g => !hits.some(h => h.t === 's' && norm(h.name) === norm(g.name)))).slice(0, 10);
    hits._all = all;
    res.innerHTML = all.length ? all.map((h, i) => {
      const c = `mlp-res${i === sel ? ' sel' : ''}`;
      if (h.t === 'p') return `<div class="${c}" data-i="${i}"><span class="mlp-ic" style="--c:var(--${h.p.categoria})">${icon(h.p.icono)}</span><div><b>${esc(h.p.nombre[lang])}</b><span>${esc((CATS[h.p.categoria] || {})[lang] || '')}</span></div></div>`;
      if (h.t === 'h') return `<div class="${c}" data-i="${i}"><span class="mlp-ic" style="--c:var(--historia)">${esc(h.pe.iniciales || '')}</span><div><b>${esc(h.pe.nombre[lang])}</b><span>${L.person} · ${esc(h.p.nombre[lang])}</span></div></div>`;
      if (h.t === 's') return `<div class="${c}" data-i="${i}"><span class="mlp-ic">⟋</span><div><b>${esc(h.name)}</b><span>${L.street}</span></div></div>`;
      return `<div class="${c}" data-i="${i}"><span class="mlp-ic">📍</span><div><b>${esc(h.name)}</b><span>${esc(h.sub || L.address)}</span></div></div>`;
    }).join('') : `<div class="mlp-res"><span>${UI[lang].none}</span></div>`;
    res.classList.add('open');
  }
  function search() {
    const s = norm(q.value.trim()); if (!s) { res.classList.remove('open'); geoHits = []; return; }
    hits = [];
    PLACES.forEach(p => { const n = norm(p.nombre.es + ' ' + p.nombre.en), t = norm((p.descripcion ? p.descripcion[lang] : '') + ' ' + (p.direccion || '') + ' ' + JSON.stringify(CATS[p.categoria] || {})); const sc = norm(p.nombre[lang]).startsWith(s) ? 0 : n.includes(s) ? 1 : t.includes(s) ? 3 : 9; if (sc < 9) hits.push({ t: 'p', p, sc }); });
    Object.values(PEOPLE).forEach(pe => { const t = norm(pe.nombre.es + ' ' + pe.nombre.en + ' ' + (pe.descripcion ? pe.descripcion[lang] : '')); if (t.includes(s) && byId[pe.lugar]) hits.push({ t: 'h', pe, p: byId[pe.lugar], sc: norm(pe.nombre[lang]).includes(s) ? 1 : 3 }); });
    STREETS.forEach((c, n) => { const nn = norm(n); if (nn.includes(s)) hits.push({ t: 's', name: n, c, sc: nn.startsWith(s) ? 1 : 2 }); });
    hits.sort((a, b) => a.sc - b.sc); hits = hits.slice(0, 8); sel = 0; render();
    if (cfg.geocoder && s.length >= 3) { clearTimeout(geoTimer); geoTimer = setTimeout(() => geocode(q.value.trim()), 450); }
  }
  function geocode(text) {
    if (text === lastGeo) return; lastGeo = text;
    if (geoCtl) geoCtl.abort(); geoCtl = new AbortController();
    const b = cfg.bounds, u = `${cfg.geocoderUrl}?q=${encodeURIComponent(text + ' La Paz')}&limit=6&lat=24.15&lon=-110.31&bbox=${b[0][0]},${b[0][1]},${b[1][0]},${b[1][1]}`;
    fetch(u, { signal: geoCtl.signal }).then(r => r.json()).then(j => {
      geoHits = (j.features || []).map(f => { const p = f.properties || {}; const name = [p.name || p.street, p.housenumber].filter(Boolean).join(' ');
        return { t: 'g', name: name || p.street || '?', sub: [p.street && p.name ? p.street : '', p.district || p.locality, p.city].filter(Boolean).join(', '), c: f.geometry.coordinates, ext: p.extent }; })
        .filter(g => g.name !== '?');
      if (q.value.trim()) render();
    }).catch(() => {});
  }
  function choose(i) {
    const h = (hits._all || [])[i]; if (!h) return; res.classList.remove('open'); q.blur();
    if (h.t === 'p' || h.t === 'h') { q.value = h.t === 'p' ? h.p.nombre[lang] : h.pe.nombre[lang]; if (!activeCats.has(h.p.categoria)) { activeCats.add(h.p.categoria); renderChips(); } openCard(h.p.id, h.t === 'h' ? h.pe.id : null, true); return; }
    q.value = h.name; closeCard();
    if (h.ext) map.fitBounds([[h.ext[0], h.ext[3]], [h.ext[2], h.ext[1]]], { padding: 80, maxZoom: 17.5 });
    else map.flyTo({ center: h.c, zoom: 17, essential: true });
    pulse(h.c);
  }
  let pulseMk = null;
  function pulse(c) {
    if (pulseMk) pulseMk.remove();
    const el = document.createElement('div'); el.className = 'mlp-mk m-full'; el.style.setProperty('--c', '#c0553a');
    el.innerHTML = `<div class="mlp-stem"></div><div class="mlp-pin"></div><div class="mlp-medal">${icon('pin')}</div>`;
    pulseMk = new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(c).addTo(map);
  }
  q.addEventListener('input', search); q.addEventListener('focus', search);
  q.addEventListener('keydown', e => {
    const n = (hits._all || []).length;
    if (e.key === 'ArrowDown') { sel = Math.min(n - 1, sel + 1); render(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); render(); e.preventDefault(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (cfg.geocoder && !n) geocode(q.value.trim()); else choose(sel); }
    else if (e.key === 'Escape') { res.classList.remove('open'); q.blur(); }
  });
  res.addEventListener('pointerdown', e => { const r = e.target.closest('[data-i]'); if (r) { e.preventDefault(); choose(+r.dataset.i); } });
  document.addEventListener('pointerdown', e => { if (!root.contains(e.target) || !e.target.closest('.mlp-search')) res.classList.remove('open'); });

  /* ---------- chips, lista, idioma, controles ---------- */
  function renderChips() {
    $('.mlp-chips').innerHTML = `<button class="mlp-chip mlp-recchip${onlyRec ? ' on' : ''}" data-rec="1">★ ${UI[lang].recs}</button>` + Object.keys(CATS).map(k => `<button class="mlp-chip${activeCats.has(k) ? '' : ' off'}" data-k="${esc(k)}" style="--c:var(--${k})"><i></i>${esc(CATS[k][lang])}</button>`).join('');
    const rc = root.querySelector('.mlp-recchip'); if (rc) rc.onclick = () => { onlyRec = !onlyRec; renderChips(); scheduleOverlay(); };
    root.querySelectorAll('.mlp-chip[data-k]').forEach(b => b.onclick = () => { const k = b.dataset.k; activeCats.has(k) ? activeCats.delete(k) : activeCats.add(k); renderChips(); scheduleOverlay(); });
  }
  const list = $('.mlp-list'), scrim = $('.mlp-scrim');
  function renderList() {
    list._near = false;
    $('.mlp-lh b').textContent = UI[lang].list;
    $('.mlp-lb').innerHTML = Object.keys(CATS).map(k => `<h4 style="--c:var(--${k})"><i></i>${esc(CATS[k][lang])}</h4>` + PLACES.filter(p => p.categoria === k).map(p => `<div class="mlp-res" data-id="${esc(p.id)}"><span class="mlp-ic" style="--c:var(--${p.categoria})">${icon(p.icono)}</span><div><b>${p.num}. ${esc(p.nombre[lang])}</b></div></div>`).join('')).join('');
    root.querySelectorAll('.mlp-lb [data-id]').forEach(r => r.onclick = () => { closeList(); const p = byId[r.dataset.id]; if (!activeCats.has(p.categoria)) { activeCats.add(p.categoria); renderChips(); } openCard(p.id, null, true); });
  }
  const closeList = () => { list.classList.remove('open'); scrim.classList.remove('open'); };
  $('.mlp-lh button').onclick = closeList; scrim.onclick = closeList;
  function setLang(l) {
    lang = l; const L = UI[l];
    root.querySelectorAll('.mlp-lang button').forEach(b => b.classList.toggle('on', b.dataset.l === l));
    $('.mlp-subtitle').textContent = L.sub; q.placeholder = L.q;
    const tips = { in: L.zin, out: L.zout, home: L.home, tilt: L.tilt, list: L.list, near: L.near, fs: L.fs };
    root.querySelectorAll('.mlp-controls button').forEach(b => { b.title = tips[b.dataset.a]; b.setAttribute('aria-label', tips[b.dataset.a]); });
    $('.mlp-compass').title = L.north;
    PLACES.forEach(p => { if (p.el) p.el.querySelector('.mlp-lbl').textContent = p.nombre[l]; p._lw = 0; p._c = ''; });
    const nm = nameExpr(l);
    const apply = () => ['water-name', 'water-name-line', 'road-name', 'place-small', 'place-city'].forEach(id => { if (map.getLayer(id)) map.setLayoutProperty(id, 'text-field', nm); });
    if (map.isStyleLoaded()) apply(); else map.once('load', apply);
    STREETS.clear(); renderChips(); if (list.classList.contains('open') && !list._near) renderList(); if (ADJUST) renderAdjust();
    if (activeId) openCard(activeId, null, false); scheduleOverlay();
  }
  root.querySelectorAll('.mlp-lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  function homeView(animate) {
    const v = (DATA && DATA.vista_inicial) || { sw: [-110.40, 24.12], ne: [-110.27, 24.35] };
    map.fitBounds([v.sw, v.ne], { padding: { top: 130, bottom: 30, left: 20, right: 60 }, pitch: 0, bearing: 0, duration: animate ? 1200 : 0 });
  }
  const tiltBtn = $('[data-a="tilt"]'); tiltBtn.classList.toggle('on', use3d);
  root.querySelectorAll('.mlp-controls button').forEach(b => b.onclick = () => {
    const a = b.dataset.a;
    if (a === 'in') map.zoomIn(); else if (a === 'out') map.zoomOut(); else if (a === 'home') homeView(true);
    else if (a === 'tilt') { use3d = !use3d; tiltBtn.classList.toggle('on', use3d); map.easeTo({ pitch: use3d ? 50 : 0, duration: 600 }); if (use3d && map.getZoom() < 15.5) map.easeTo({ pitch: 50, zoom: 16.2, duration: 900 }); }
    else if (a === 'list') { renderList(); list.classList.add('open'); scrim.classList.add('open'); }
    else if (a === 'near') nearMe();
    else if (a === 'fs') {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (root.requestFullscreen) root.requestFullscreen().catch(() => root.classList.toggle('mlp-fs'));
      else root.classList.toggle('mlp-fs');
      setTimeout(() => map.resize(), 300);
    }
  });
  $('.mlp-compass').onclick = () => map.easeTo({ bearing: 0, pitch: map.getPitch(), duration: 500 });

  function toast(text, ms) {
    const t = document.createElement('div'); t.className = 'mlp-toast mlp-panel'; t.textContent = text; root.appendChild(t);
    setTimeout(() => { t.style.opacity = 0; setTimeout(() => t.remove(), 700); }, ms || 2600);
  }
  toast(UI[lang].hint);

  /* ---------- velero y catamarán ---------- */
  const boats = [];
  const WIND_FROM = 315; // viento del noroeste
  function startBoats(list) {
    if (boats.length || !list.length) return;
    list.forEach((b, i) => {
      if (!BOATS[b.tipo] || !b.ruta || b.ruta.length < 2) return;
      const el = document.createElement('div'); el.className = 'mlp-boat'; el.innerHTML = BOATS[b.tipo];
      const o = { cfg: b, route: b.ruta.map(c => c.slice()), i: 1, dir: 1, pos: b.ruta[0].slice(), hdg: bearing(b.ruta[0], b.ruta[1]), v: 0, el,
        main: el.querySelector('.main'), jib: el.querySelector('.jib'), len: b.tipo === 'cata' ? 28 : 25, ph: i * 2.1 };
      o.mk = new maplibregl.Marker({ element: el, anchor: 'center', rotationAlignment: 'map', pitchAlignment: 'map' }).setLngLat(o.pos).addTo(map);
      boats.push(o);
    });
    map.on('idle', validateRoutes);
    requestAnimationFrame(tick);
  }
  // Quita de la ruta los puntos que, ya dibujado el mapa, no caen en agua.
  function validateRoutes() {
    if (!map.getLayer('water')) return;
    boats.forEach(o => {
      if (o.route.length <= 2) return;
      const keep = o.route.filter(c => {
        const pt = map.project(c); if (pt.x < 0 || pt.y < 0 || pt.x > root.clientWidth || pt.y > root.clientHeight) return true;
        return map.queryRenderedFeatures(pt, { layers: ['water'] }).length > 0;
      });
      if (keep.length >= 2 && keep.length < o.route.length) { o.route = keep; o.i = Math.min(o.i, keep.length - 1); }
    });
  }
  let last = performance.now(), T = 0;
  function tick(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; T += dt;
    const zz = map.getZoom(), lat = 24.2;
    const mpp = 78271.517 * Math.cos(lat / R2D) / Math.pow(2, zz);
    for (const o of boats) {
      const tgt = o.route[o.i];
      const want = bearing(o.pos, tgt), d = angDiff(o.hdg, want);
      o.hdg += Math.max(-14 * dt, Math.min(14 * dt, d));
      const speed = (o.cfg.velocidad || 4) * Math.min(6, Math.max(1, mpp / .9)) * (Math.abs(d) > 60 ? .5 : 1);
      o.v += (speed - o.v) * Math.min(1, dt * .7);
      const m = mPerDeg(o.pos[1]), step = o.v * dt;
      o.pos[0] += Math.sin(o.hdg / R2D) * step / m[0]; o.pos[1] += Math.cos(o.hdg / R2D) * step / m[1];
      if (distM(o.pos, tgt) < Math.max(25, o.v * 3)) {
        if (o.cfg.circular) o.i = (o.i + 1) % o.route.length;
        else { o.i += o.dir; if (o.i >= o.route.length || o.i < 0) { o.dir *= -1; o.i += 2 * o.dir; } }
      }
      // tamaño: exagerado lo justo para verse, con mínimo y máximo en pantalla
      const Lpx = Math.max(22, Math.min(96, 42 / mpp)) * (o.cfg.tipo === 'cata' ? 1.1 : 1);
      const w = Lpx * 136 / o.len;
      if (o._w !== Math.round(w)) { o._w = Math.round(w); o.el.style.width = o._w + 'px'; o.el.style.height = Math.round(w * 56 / 136) + 'px'; }
      let rel = angDiff(WIND_FROM + 180, o.hdg);
      const open = (12 + 58 * Math.abs(Math.sin(rel / 2 / R2D))) * (rel > 0 ? -1 : 1) + Math.sin(T * .8 + o.ph) * 1.5;
      if (o.main) o.main.setAttribute('transform', `rotate(${open.toFixed(1)} ${o.cfg.tipo === 'cata' ? 3.8 : 3.6} 0)`);
      if (o.jib) o.jib.setAttribute('transform', `rotate(${(open * .6).toFixed(1)} 12 0)`);
      o.mk.setLngLat(o.pos); o.mk.setRotation(o.hdg - 90);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- cerca de mí ---------- */
  let meMk = null, watchId = null; const toasted = new Set();
  const fmtD = d => d < 1000 ? Math.round(d / 10) * 10 + ' m' : (d / 1000).toFixed(1) + ' km';
  function inLaPaz(c) { const b = cfg.bounds; return c[0] > b[0][0] && c[0] < b[1][0] && c[1] > b[0][1] && c[1] < b[1][1]; }
  function showMe(c) {
    if (!inLaPaz(c)) return;
    if (!meMk) { const el = document.createElement('div'); el.className = 'mlp-me'; el.title = UI[lang].youHere; meMk = new maplibregl.Marker({ element: el }).setLngLat(c).addTo(map); }
    else meMk.setLngLat(c);
  }
  function nearMe() {
    if (!navigator.geolocation) { toast(UI[lang].geoErr, 4500); return; }
    navigator.geolocation.getCurrentPosition(pos => {
      const me = [pos.coords.longitude, pos.coords.latitude];
      showMe(me); renderNear(me);
      if (watchId == null && inLaPaz(me)) watchId = navigator.geolocation.watchPosition(pp => { const m2 = [pp.coords.longitude, pp.coords.latitude]; showMe(m2); proximity(m2); }, () => {}, { enableHighAccuracy: true, maximumAge: 15000 });
    }, () => toast(UI[lang].geoErr, 4500), { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 });
  }
  function renderNear(me) {
    const L = UI[lang]; let ref = me, note = '';
    if (!inLaPaz(me)) { ref = [-110.3128, 24.1617]; note = `<p class="mlp-note">${L.notHere}</p>`; }
    const items = PLACES.filter(p => p.nivel !== 'basico' && activeCats.has(p.categoria))
      .map(p => ({ p, d: distM(ref, p.coordenadas) })).filter(x => x.d < 3000)
      .sort((a, b) => a.d * (a.p.nivel === 'sobresaliente' ? .6 : 1) - b.d * (b.p.nivel === 'sobresaliente' ? .6 : 1)).slice(0, 12);
    $('.mlp-lh b').textContent = L.nearTitle; list._near = true;
    $('.mlp-lb').innerHTML = note + (items.length ? items.map(({ p, d }) => `<div class="mlp-res" data-id="${esc(p.id)}"><span class="mlp-ic" style="--c:var(--${p.categoria})">${icon(p.icono)}</span><div><b>${esc(p.nombre[lang])}${p.nivel === 'sobresaliente' ? ' <span class="mlp-star-s">★</span>' : ''}</b><span>${fmtD(d)} · ${esc((CATS[p.categoria] || {})[lang] || '')}</span></div></div>`).join('') : `<p class="mlp-note">${L.noneNear}</p>`);
    root.querySelectorAll('.mlp-lb [data-id]').forEach(r => r.onclick = () => { closeList(); openCard(r.dataset.id, null, true); });
    list.classList.add('open'); scrim.classList.add('open');
    if (inLaPaz(me)) map.flyTo({ center: me, zoom: Math.max(map.getZoom(), 15), essential: true });
  }
  function proximity(me) {
    PLACES.forEach(p => {
      if (p.nivel === 'basico' || toasted.has(p.id) || !activeCats.has(p.categoria)) return;
      const d = distM(me, p.coordenadas);
      if (d < (p.nivel === 'sobresaliente' ? 250 : 150)) { toasted.add(p.id); toast(`${UI[lang].nearToast}: ${p.nombre[lang]} · ${fmtD(d)}`, 4500); }
    });
  }

  /* ---------- modo ajuste (?ajustar) ---------- */
  let adjPanel = null, routeMks = [], popup = null, boatsEdited = false;
  function renderAdjust() {
    if (!ADJUST) return; const L = UI[lang];
    if (!adjPanel) { adjPanel = document.createElement('div'); adjPanel.className = 'mlp-adjust mlp-panel'; root.appendChild(adjPanel); }
    const n = adjChanged.size + (boatsEdited ? 1 : 0);
    adjPanel.innerHTML = `<b>✎ ${L.adj}</b><small>${L.adjHelp}</small><div class="mlp-adj-count">${n ? n + ' ' + L.adjChanged : L.adjNone}</div>
      <div class="mlp-actions"><button class="mlp-btn" data-x="copy"${n ? '' : ' disabled'}>${L.adjCopy}</button><button class="mlp-btn primary" data-x="dl">${L.adjDl}</button><button class="mlp-btn${routeMks.length ? ' on' : ''}" data-x="boats">⛵ ${L.adjBoats}</button></div>`;
    adjPanel.querySelector('[data-x=copy]').onclick = () => copyText(JSON.stringify(changesObj(), null, 2)).then(() => toast(L.adjCopied));
    adjPanel.querySelector('[data-x=dl]').onclick = downloadJSON;
    adjPanel.querySelector('[data-x=boats]').onclick = toggleRouteEdit;
  }
  function changesObj() {
    const o = { lugares: {} }; adjChanged.forEach(id => o.lugares[id] = byId[id].coordenadas);
    if (boatsEdited) o.barcos = (DATA.barcos || []).map(b => ({ tipo: b.tipo, ruta: b.ruta }));
    return o;
  }
  function exportData() {
    const d = JSON.parse(JSON.stringify(DATA));
    (d.lugares || []).forEach(l => { if (adjChanged.has(l.id)) { l.coordenadas = byId[l.id].coordenadas; l.verificar = false; } });
    return d;
  }
  function downloadJSON() {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'lugares.json';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function copyText(txt) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt).catch(() => fallbackCopy(txt));
    return Promise.resolve(fallbackCopy(txt));
  }
  function fallbackCopy(txt) { const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); }
  function toggleRouteEdit() {
    if (routeMks.length) { routeMks.forEach(m => m.remove()); routeMks = []; renderAdjust(); return; }
    boats.forEach((b, bi) => {
      b.cfg.ruta.forEach((c, ci) => {
        const el = document.createElement('div'); el.className = 'mlp-rpt'; el.textContent = ci + 1; el.style.background = bi ? '#c0553a' : '#2f93a3';
        const m = new maplibregl.Marker({ element: el, draggable: true }).setLngLat(c).addTo(map);
        m.on('dragend', () => { const ll = m.getLngLat(); b.cfg.ruta[ci] = [+ll.lng.toFixed(5), +ll.lat.toFixed(5)]; b.route = b.cfg.ruta.map(x => x.slice()); b.i = Math.min(b.i, b.route.length - 1); boatsEdited = true; renderAdjust(); });
        routeMks.push(m);
      });
    });
    renderAdjust();
  }
  if (ADJUST) {
    root.classList.add('mlp-adjusting');
    map.on('click', e => {
      if (popup) popup.remove();
      const v = [+e.lngLat.lng.toFixed(5), +e.lngLat.lat.toFixed(5)], txt = `[${v[0]}, ${v[1]}]`;
      const div = document.createElement('div'); div.className = 'mlp-pop'; div.innerHTML = `<code>${txt}</code> <button class="mlp-btn">${UI[lang].copy}</button>`;
      div.querySelector('button').onclick = () => copyText(txt).then(() => toast(UI[lang].adjCopied));
      popup = new maplibregl.Popup({ closeButton: true, offset: 8 }).setLngLat(e.lngLat).setDOMContent(div).addTo(map);
    });
  }

  root.__mlpMap = map;
  root.__mlpApi = { map, openCard, setLang, get places() { return PLACES; }, streets: STREETS };
}

/* ======================= arranque ======================= */
function boot() { document.querySelectorAll('.mlp-root').forEach(init); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
// Elementor y constructores que insertan el shortcode después de cargar la página
if (window.MutationObserver) new MutationObserver(m => { if (m.some(r => r.addedNodes.length)) boot(); }).observe(document.documentElement, { childList: true, subtree: true });
window.MapaLaPaz = { init, boot };
})();
