/*!
 * Mapa Interactivo La Paz v0.3.0
 * Estilo lápiz de color sobre papel · MapLibre GL + OpenStreetMap (OpenFreeMap)
 */
(function () {
'use strict';

/* ======================= íconos y barcos ======================= */
const ICONS = {"cathedral": "<rect x=\"12\" y=\"20\" width=\"24\" height=\"19\" fill=\"#f3e6cc\"/><rect x=\"7\" y=\"15\" width=\"8\" height=\"24\" fill=\"#ead2a8\"/><rect x=\"33\" y=\"15\" width=\"8\" height=\"24\" fill=\"#ead2a8\"/> <path d=\"M7 15 L11 8 L15 15Z M33 15 L37 8 L41 15Z\" fill=\"#c8553d\"/><path d=\"M12 20 L24 12 L36 20Z\" fill=\"#c8553d\"/> <path d=\"M20 39 v-7 a4 4 0 0 1 8 0 v7Z\" fill=\"#7a5238\"/><circle cx=\"24\" cy=\"24.5\" r=\"2.4\" fill=\"#8fc3cf\"/> <path d=\"M24 5 v6 M21.6 7.2 h4.8\" fill=\"none\"/><path d=\"M9.5 21 h3 M35.5 21 h3 M9.5 27 h3 M35.5 27 h3\" fill=\"none\"/><path d=\"M5 40 H43\" fill=\"none\"/>", "kiosk": "<path d=\"M9 22 Q24 4 39 22Z\" fill=\"#4a9f97\"/><path d=\"M14 18 Q24 9 34 18\" fill=\"none\" stroke=\"#e8f2ee\" stroke-width=\"1.3\"/> <rect x=\"9\" y=\"22\" width=\"30\" height=\"3.5\" fill=\"#f3e6cc\"/><path d=\"M13 25.5 v10.5 M20 25.5 v10.5 M28 25.5 v10.5 M35 25.5 v10.5\" fill=\"none\" stroke-width=\"2.3\"/> <rect x=\"7\" y=\"36\" width=\"34\" height=\"4.5\" fill=\"#ead2a8\"/><circle cx=\"24\" cy=\"5\" r=\"2\" fill=\"#d9a441\"/>", "library": "<path d=\"M7 18 L24 8 L41 18Z\" fill=\"#d98a62\"/><rect x=\"8\" y=\"18\" width=\"32\" height=\"3.5\" fill=\"#f3e6cc\"/> <path d=\"M12.5 21.5 v12.5 M18.5 21.5 v12.5 M29.5 21.5 v12.5 M35.5 21.5 v12.5\" fill=\"none\" stroke-width=\"2.3\"/> <path d=\"M21 33 v-8 h6 v8Z\" fill=\"#8fc3cf\"/><rect x=\"6\" y=\"34\" width=\"36\" height=\"5.5\" fill=\"#f3e6cc\"/><circle cx=\"24\" cy=\"14.5\" r=\"2\" fill=\"#f3e6cc\"/>", "museum": "<path d=\"M7 17 L24 7 L41 17Z\" fill=\"#9a83c4\"/><rect x=\"8\" y=\"17\" width=\"32\" height=\"3.5\" fill=\"#f3e6cc\"/> <path d=\"M12.5 20.5 v13.5 M35.5 20.5 v13.5\" fill=\"none\" stroke-width=\"2.3\"/> <path d=\"M20.5 23 h7 l-1 2.5 q4 3 1.5 8 h-8 q-2.5 -5 1.5 -8Z\" fill=\"#cf862c\"/><path d=\"M19.5 29 h9\" fill=\"none\" stroke=\"#f3e6cc\"/> <rect x=\"6\" y=\"34\" width=\"36\" height=\"5.5\" fill=\"#f3e6cc\"/>", "theater": "<path d=\"M6 11 h17 v10 a8.5 8.5 0 0 1 -17 0Z\" fill=\"#f3e6cc\"/><path d=\"M10 17 q2 -2 4 0 M15 17 q2 -2 4 0 M10.5 23 q4 4 8 0\" fill=\"none\"/> <path d=\"M24 19 h17 v10 a8.5 8.5 0 0 1 -17 0Z\" fill=\"#e2b955\"/><path d=\"M28 25 q2 2 4 0 M33 25 q2 2 4 0 M28.5 33 q4 -4 8 0\" fill=\"none\"/>", "whale": "<path d=\"M5 28 C5 18 26 16 33 24 L42 17 L40 26 L45 32 L35 29 C28 37 7 39 5 28Z\" fill=\"#5d86a3\"/> <path d=\"M8 31 C14 35 26 35 32 30\" fill=\"none\" stroke=\"#d6e6ef\" stroke-width=\"2\"/><circle cx=\"12.5\" cy=\"25\" r=\"1.4\" fill=\"#3b3632\" stroke=\"none\"/> <path d=\"M15 16 q-2 -4 -5 -5 M15 16 q0 -5 2 -8 M15 16 q2 -4 5 -4\" fill=\"none\" stroke=\"#8fc3cf\" stroke-width=\"1.8\" stroke-linecap=\"round\"/>", "market": "<rect x=\"10\" y=\"22\" width=\"28\" height=\"17\" fill=\"#f3e6cc\"/><path d=\"M7 22 L11 11 H37 L41 22Z\" fill=\"#c8553d\"/> <path d=\"M17.5 11.5 L16 21.5 M24 11.5 V21.5 M30.5 11.5 L32 21.5\" stroke=\"#f3e6cc\" stroke-width=\"3\"/> <circle cx=\"18\" cy=\"31\" r=\"3.6\" fill=\"#d9a441\"/><circle cx=\"25\" cy=\"31\" r=\"3.6\" fill=\"#7fa36a\"/><circle cx=\"31.5\" cy=\"31.5\" r=\"3\" fill=\"#c8553d\"/>", "hotel": "<rect x=\"13\" y=\"9\" width=\"22\" height=\"31\" fill=\"#e3a08e\"/><path d=\"M13 9 h22 v4 h-22Z\" fill=\"#c8553d\"/> <path d=\"M17 17 h4 v4 h-4Z M27 17 h4 v4 h-4Z M17 25 h4 v4 h-4Z M27 25 h4 v4 h-4Z\" fill=\"#8fc3cf\"/><path d=\"M21 40 v-6 h6 v6\" fill=\"#f3e6cc\"/><path d=\"M8 40 H40\" fill=\"none\"/>", "beach": "<path d=\"M5 40 Q24 31 43 40 V43 H5Z\" fill=\"#ecd49a\"/><path d=\"M24 15 V37\" fill=\"none\" stroke-width=\"2\"/> <path d=\"M7 22 Q24 3 41 22 Q36.5 18 32.5 22 Q28.5 18 24 22 Q19.5 18 15.5 22 Q11.5 18 7 22Z\" fill=\"#d0603f\"/> <path d=\"M24 9 Q20 14 15.5 22 M24 9 Q28 14 32.5 22\" fill=\"none\" stroke=\"#f3e6cc\" stroke-width=\"1.4\"/><circle cx=\"39\" cy=\"9\" r=\"4\" fill=\"#e2b955\"/>", "hongo": "<path d=\"M20 39 C21.5 33 19.5 28 22 25 H27.5 C29 29 27 34 29.5 39Z\" fill=\"#cf9a6a\"/> <path d=\"M9 24.5 C9 13.5 39 11.5 40 22.5 C37 28 14 29 9 24.5Z\" fill=\"#a9673d\"/><path d=\"M14 20 Q22 15 33 18\" fill=\"none\" stroke=\"#dcae82\"/> <path d=\"M4 40 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "ferry": "<path d=\"M5 29 H43 L38 38 H10Z\" fill=\"#f3e6cc\"/><rect x=\"12\" y=\"20\" width=\"23\" height=\"9\" fill=\"#fffdf7\"/> <path d=\"M15 24.5 h2 M20 24.5 h2 M25 24.5 h2 M30 24.5 h2\" stroke-width=\"2.4\"/><rect x=\"26\" y=\"13\" width=\"5\" height=\"7\" fill=\"#c8553d\"/> <path d=\"M10 33.5 H38.5\" stroke=\"#4d7fa0\" stroke-width=\"2.6\"/><path d=\"M4 42 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "marina": "<path d=\"M24 7 V31\" fill=\"none\" stroke-width=\"2\"/><path d=\"M25.5 8 L38 30 H25.5Z\" fill=\"#fffdf7\"/><path d=\"M22.5 12 L11 30 H22.5Z\" fill=\"#e2b955\"/> <path d=\"M8 32 H40 L35 38.5 H13Z\" fill=\"#c8553d\"/><path d=\"M4 43 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "island": "<path d=\"M3 36 C9 27 37 25 45 36Z\" fill=\"#ecd49a\"/><path d=\"M8 34 C11 22 22 18 30 34Z\" fill=\"#b98455\"/> <path d=\"M33 34 C33.5 28 33.4 24 32 20\" fill=\"none\" stroke=\"#8a6a4a\" stroke-width=\"2.2\"/> <path d=\"M32 20 C29 17 25 18 24 21 C27 20 29.5 20 32 20Z M32 20 C33 16 36.5 15 39.5 16.5 C36.5 17 34 18.5 32 20Z M32 20 C35.5 19.5 38.5 22 38.5 25 C36.5 22.5 34.5 21 32 20Z\" fill=\"#6f9a5a\"/> <path d=\"M3 41 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "dunes": "<path d=\"M4 33 C11 19 20 20 26 29 C30 22 38 22 44 31 V38 H4Z\" fill=\"#ecd49a\"/> <circle cx=\"10\" cy=\"37\" r=\"4\" fill=\"#6f9a5a\"/><circle cx=\"17\" cy=\"38\" r=\"4.5\" fill=\"#86ad6c\"/><circle cx=\"25\" cy=\"38\" r=\"3.8\" fill=\"#6f9a5a\"/><circle cx=\"34\" cy=\"38\" r=\"4.4\" fill=\"#86ad6c\"/> <path d=\"M3 44 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "whaleshark": "<path d=\"M18 20 L22 11 L26 20Z\" fill=\"#5a7896\"/><path d=\"M3 27 C9 18 30 18 38 22 L45 14 L43 25 L46 34 L38 29 C30 34 9 35 3 27Z\" fill=\"#5a7896\"/> <g fill=\"#f3e6cc\" stroke=\"none\"><circle cx=\"14\" cy=\"23.5\" r=\"1.2\"/><circle cx=\"19\" cy=\"25\" r=\"1.2\"/><circle cx=\"24\" cy=\"23\" r=\"1.2\"/><circle cx=\"28\" cy=\"26\" r=\"1.2\"/><circle cx=\"32\" cy=\"24\" r=\"1.1\"/><circle cx=\"21\" cy=\"28.5\" r=\"1.1\"/><circle cx=\"26\" cy=\"29.5\" r=\"1.1\"/></g>", "caravel": "<path d=\"M6 30 H42 L36 39 H12Z\" fill=\"#8f6240\"/><path d=\"M25 6 V30 M15 13 V30\" fill=\"none\" stroke-width=\"1.8\"/> <path d=\"M25.6 9 Q35 16 25.6 25Z\" fill=\"#f3e6cc\"/><path d=\"M29 13.5 v7 M26.5 17 h5.5\" fill=\"none\" stroke=\"#c8553d\" stroke-width=\"1.8\"/> <path d=\"M15.6 15 Q22 20 15.6 26Z\" fill=\"#f3e6cc\"/><path d=\"M25 6 l6 2 -6 2\" fill=\"#c8553d\"/> <path d=\"M4 43 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "manta": "<path d=\"M24 11 C28 18 36 20 45 23 C36 26 30 30 24 35 C18 30 12 26 3 23 C12 20 20 18 24 11Z\" fill=\"#4f5f86\"/> <path d=\"M24 35 L24 45\" fill=\"none\"/><path d=\"M17 22 Q24 19 31 22\" fill=\"none\" stroke=\"#b9c6e6\" stroke-width=\"1.3\"/>", "palm": "<circle cx=\"35\" cy=\"13\" r=\"6.5\" fill=\"#e2b955\"/><path d=\"M22 40 C23 32 23 24 21 17\" fill=\"none\" stroke=\"#8a6a4a\" stroke-width=\"3.2\" stroke-linecap=\"round\"/> <path d=\"M21 17 C15 12 9 14 6.5 18.5 C12 16 16 16.6 21 17Z M21 17 C18 10 22 5.6 27.5 5.4 C24 8.6 22 12 21 17Z M21 17 C27 12 34 16 35.5 21.5 C30 18 26 17 21 17Z M21 17 C14 18 11 23 12 27.5 C15 22 18 19 21 17Z\" fill=\"#6f9a5a\"/> <path d=\"M5 42 q4.3 -3 8.6 0 t8.6 0 t8.6 0 t8.6 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "pin": "<path d=\"M24 6 C15 6 10 13 10 20 C10 30 24 42 24 42 C24 42 38 30 38 20 C38 13 33 6 24 6Z\" fill=\"#c0553a\"/><circle cx=\"24\" cy=\"20\" r=\"5.5\" fill=\"#fbf6ea\"/>", "cup": "<path d=\"M11 18 H33 V30 a9 9 0 0 1 -9 9 h-4 a9 9 0 0 1 -9 -9Z\" fill=\"#f3e6cc\"/><path d=\"M33 21 h3 a5 5 0 0 1 0 10 h-3\" fill=\"none\"/><path d=\"M17 8 q-2 3 0 6 M23 6 q-2 4 0 8 M29 8 q-2 3 0 6\" fill=\"none\" stroke=\"#8a6a4a\" stroke-linecap=\"round\"/><path d=\"M8 41 H38\" fill=\"none\"/><path d=\"M14 23 H30\" stroke=\"#a9673d\" stroke-width=\"3\"/>", "food": "<circle cx=\"24\" cy=\"26\" r=\"14\" fill=\"#f3e6cc\"/><circle cx=\"24\" cy=\"26\" r=\"9\" fill=\"#d26a45\"/><path d=\"M19 23 q5 -4 10 0 q-5 5 -10 0Z\" fill=\"#e2b955\"/><circle cx=\"21\" cy=\"29\" r=\"1.6\" fill=\"#6f9a5a\" stroke=\"none\"/><circle cx=\"27\" cy=\"29\" r=\"1.6\" fill=\"#6f9a5a\" stroke=\"none\"/><path d=\"M6 10 v10 M9 10 v10 M12 10 v10 M6 20 q3 3 6 0 M9 22 v18 M40 10 q-4 6 -1 13 h2 v17\" fill=\"none\" stroke-linecap=\"round\"/>", "kayak": "<path d=\"M4 30 C14 24 34 24 44 30 C34 35 14 35 4 30Z\" fill=\"#d9a441\"/><ellipse cx=\"24\" cy=\"29.5\" rx=\"6\" ry=\"2.4\" fill=\"#5b5048\"/><circle cx=\"24\" cy=\"20\" r=\"3.2\" fill=\"#e9c9a0\"/><path d=\"M24 23 v5\" fill=\"none\" stroke-width=\"2.2\"/><path d=\"M12 14 L36 34\" fill=\"none\" stroke-width=\"2\"/><path d=\"M9 11 l5 1 -1 4Z M39 37 l-5 -1 1 -4Z\" fill=\"#c8553d\"/><path d=\"M3 41 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "sealion": "<path d=\"M8 36 C10 26 18 18 26 16 C28 12 33 10 36 13 C39 16 37 20 34 21 C32 26 30 32 32 36Z\" fill=\"#9b7a5a\"/><circle cx=\"33\" cy=\"15\" r=\"1.2\" fill=\"#3b3632\" stroke=\"none\"/><path d=\"M37 16 l4 -1 M37 17.5 l4 1\" fill=\"none\" stroke-width=\"1.2\"/><path d=\"M14 36 l-5 4 M24 34 l3 6\" fill=\"none\" stroke-width=\"2\"/><path d=\"M3 42 q5 -3 10 0 t10 0 t10 0 t10 0\" fill=\"none\" stroke=\"#2f93a3\" stroke-width=\"2.2\"/>", "cocktail": "<path d=\"M9 9 H39 L24 26Z\" fill=\"#e2a08e\"/><path d=\"M14 14 H34\" fill=\"none\" stroke=\"#fbf6ea\" stroke-width=\"2\"/><path d=\"M24 26 V39 M16 40 H32\" fill=\"none\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><circle cx=\"35\" cy=\"10\" r=\"5\" fill=\"#d9a441\"/><path d=\"M29 5 L22 18\" fill=\"none\" stroke-width=\"1.6\"/>", "family": "<circle cx=\"16\" cy=\"13\" r=\"5\" fill=\"#e9c9a0\"/><circle cx=\"32\" cy=\"13\" r=\"5\" fill=\"#e9c9a0\"/><circle cx=\"24\" cy=\"24\" r=\"4\" fill=\"#e9c9a0\"/><path d=\"M8 40 V27 a8 8 0 0 1 16 0\" fill=\"#4a9f97\"/><path d=\"M24 27 a8 8 0 0 1 16 0 V40\" fill=\"#d26a45\"/><path d=\"M18 40 V34 a6 6 0 0 1 12 0 V40\" fill=\"#d9a441\"/><path d=\"M5 41 H43\" fill=\"none\"/>"};
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
    err: 'No se pudieron cargar los lugares.', zin: 'Acercar', zout: 'Alejar', home: 'Vista inicial', tilt: 'Vista 3D', fs: 'Pantalla completa', north: 'Norte', rec: 'Recomendado', recs: 'Recomendados', near: 'Cerca de mí', nearTitle: 'Recomendados cerca de ti', notHere: 'No pareces estar en La Paz: te mostramos lo recomendado cerca del centro.', geoErr: 'No pudimos obtener tu ubicación. Revisa el permiso de ubicación del navegador.', nearToast: 'Cerca de ti', contact: 'Contacto', social: 'Redes sociales', book: 'Reservar', hours: 'Horario', web: 'Sitio web', call: 'Llamar', example: 'Ejemplo', youHere: 'Estás aquí', noneNear: 'No hay lugares recomendados a menos de 3 km.', adj: 'Modo ajuste', adjHelp: 'Arrastra los medallones a su lugar exacto. Toca el mapa para ver coordenadas.', adjCopy: 'Copiar cambios', adjDl: 'Descargar lugares.json', adjBoats: 'Rutas de barcos', adjCopied: 'Cambios copiados', adjNone: 'Sin cambios todavía', adjChanged: 'cambios', copy: 'Copiar', wTitle: '¿Qué quieres descubrir hoy?', wSub: 'Elige hasta 3', wGo: 'Explorar', wAll: 'Ver todo', wNo: 'No mostrar de nuevo', mood: 'Mi mood', all: 'Todo', need: 'Necesito…', needTitle: '¿Qué necesitas?', svcAtm: 'Cajero', svcPharmacy: 'Farmacia', svcHospital: 'Hospital o clínica', svcEmerg: 'Emergencias', svcHide: 'Ocultar servicios', svcNone: 'No encontramos ese servicio en esta zona del mapa. Acércate o muévete a otra zona.', svcNear: 'Los más cercanos', open: 'Ver ficha', today: 'Hoy en La Paz', events: 'Eventos', coupons: 'Cuponera', partners: 'Recomendados del mes', yourBiz: 'Tu negocio aquí', yourBizSub: 'Anúnciate en el mapa', sunset: 'Atardecer', weatherBy: 'Clima: MET Norway', inDays: 'Faltan {n} días', today2: '¡Hoy!', nowOn: 'En curso', until: 'Válido hasta', getCoupon: 'Descargar cupón', yourCode: 'Tu código', saved: 'Cupón guardado en tu teléfono', already: 'Ya descargaste este cupón', showAt: 'Muestra este código en el negocio.', expired: 'Vencido', couponTypes: { descuento: 'Descuento', cortesia: 'Cortesía', upgrade: 'Upgrade' }, back: 'Volver', moreInfo: 'Más información' },
  en: { sub: 'Baja California Sur · interactive map', q: 'Search places, streets, addresses…', list: 'Places', people: 'People & history',
    refs: 'Related', photos: 'Photos', none: 'No results', person: 'Person', street: 'Street', address: 'Address',
    hint: 'Zoom in to see streets and buildings', go: 'Directions', verify: 'Approximate location', N: 'N', O: 'W',
    err: 'Places could not be loaded.', zin: 'Zoom in', zout: 'Zoom out', home: 'Home view', tilt: '3D view', fs: 'Full screen', north: 'North', rec: 'Recommended', recs: 'Recommended', near: 'Near me', nearTitle: 'Recommended near you', notHere: 'You don’t seem to be in La Paz: here are recommendations near downtown.', geoErr: 'We couldn’t get your location. Check the browser’s location permission.', nearToast: 'Near you', contact: 'Contact', social: 'Social media', book: 'Book', hours: 'Hours', web: 'Website', call: 'Call', example: 'Example', youHere: 'You are here', noneNear: 'No recommended places within 3 km.', adj: 'Adjust mode', adjHelp: 'Drag the medallions to their exact spot. Tap the map to see coordinates.', adjCopy: 'Copy changes', adjDl: 'Download lugares.json', adjBoats: 'Boat routes', adjCopied: 'Changes copied', adjNone: 'No changes yet', adjChanged: 'changes', copy: 'Copy', wTitle: 'What do you want to discover today?', wSub: 'Pick up to 3', wGo: 'Explore', wAll: 'See everything', wNo: 'Don’t show again', mood: 'My mood', all: 'All', need: 'I need…', needTitle: 'What do you need?', svcAtm: 'ATM', svcPharmacy: 'Pharmacy', svcHospital: 'Hospital or clinic', svcEmerg: 'Emergencies', svcHide: 'Hide services', svcNone: 'We couldn’t find that service in this part of the map. Zoom in or move elsewhere.', svcNear: 'Nearest', open: 'View details', today: 'Today in La Paz', events: 'Events', coupons: 'Coupons', partners: 'This month’s picks', yourBiz: 'Your business here', yourBizSub: 'Advertise on the map', sunset: 'Sunset', weatherBy: 'Weather: MET Norway', inDays: '{n} days to go', today2: 'Today!', nowOn: 'Happening now', until: 'Valid until', getCoupon: 'Get coupon', yourCode: 'Your code', saved: 'Coupon saved to your phone', already: 'You already got this coupon', showAt: 'Show this code at the business.', expired: 'Expired', couponTypes: { descuento: 'Discount', cortesia: 'Freebie', upgrade: 'Upgrade' }, back: 'Back', moreInfo: 'More info' }
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
  aid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2.5" fill="#fbe3dc"/><path d="M9 6V4.5h6V6M12 9.5v7M8.5 13h7" stroke="#c0553a" stroke-width="2.4"/></svg>',
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
      // servicios: ocultos hasta que se piden con "Necesito…"
      ...svcLayers(nm, z),
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
const SVC = {
  atm: { vals: ['atm', 'bank'], color: '#2c8a6e', txt: '$' },
  pharmacy: { vals: ['pharmacy', 'chemist'], color: '#2f7fd6', txt: '+' },
  hospital: { vals: ['hospital', 'clinic', 'doctors'], color: '#c0553a', txt: 'H' }
};
const svcFilter = k => ['match', ['coalesce', ['get', 'subclass'], ['get', 'class'], ''], SVC[k].vals, true, false];
function svcLayers(nm, z) {
  const out = [];
  Object.keys(SVC).forEach(k => {
    const base = { source: 'omt', 'source-layer': 'poi', filter: svcFilter(k) };
    out.push(Object.assign({ id: 'svc-' + k + '-c', type: 'circle', layout: { visibility: 'none' }, paint: { 'circle-radius': z(12, 6, 17, 12), 'circle-color': SVC[k].color, 'circle-stroke-color': '#fbf6ea', 'circle-stroke-width': 2 } }, base));
    out.push(Object.assign({ id: 'svc-' + k + '-t', type: 'symbol', layout: { visibility: 'none', 'text-field': SVC[k].txt, 'text-font': ['Noto Sans Bold'], 'text-size': z(12, 9, 17, 15), 'text-allow-overlap': true, 'text-ignore-placement': true }, paint: { 'text-color': '#ffffff' } }, base));
    out.push(Object.assign({ id: 'svc-' + k + '-n', type: 'symbol', minzoom: 15, layout: { visibility: 'none', 'text-field': nm, 'text-font': ['Noto Sans Bold'], 'text-size': 11, 'text-offset': [0, 1.5], 'text-anchor': 'top', 'text-max-width': 9 }, paint: { 'text-color': SVC[k].color, 'text-halo-color': '#fbf6ea', 'text-halo-width': 1.6 } }, base));
  });
  return out;
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
        <button class="mlp-pill mlp-panel" data-a="today"><span class="mlp-wx">☀</span> <b class="mlp-temp">--°</b> <span class="mlp-clock">--:--</span></button>
        <div class="mlp-spacer"></div>
        <div class="mlp-lang mlp-panel"><button data-l="es">ES</button><button data-l="en">EN</button></div>
      </div>
      <div class="mlp-search">${SVG.mag}<input type="search" autocomplete="off" aria-label="Buscar"><div class="mlp-results mlp-panel"></div></div>
      <div class="mlp-chips"></div>
    </div>
    <div class="mlp-controls">
      <button data-a="in">${SVG.plus}</button><button data-a="out">${SVG.minus}</button>
      <button data-a="home">${SVG.home}</button><button data-a="tilt">3D</button>
      <button data-a="list">${SVG.list}</button><button data-a="near">${SVG.loc}</button><button data-a="need">${SVG.aid}</button><button data-a="fs">${SVG.fs}</button>
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
  const activeCats = new Set(), activeTags = new Set();
  let PROFILES = [], chosen = [], showAll = true;
  const STREETS = new Map();
  let use3d = !!cfg.pitch3d;

  /* ---------- datos ---------- */
  fetch(cfg.dataUrl, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => {
    DATA = d; CATS = d.categorias || {}; PROFILES = d.perfiles || []; Object.keys(CATS).forEach(k => { if (!CATS[k].servicio) activeCats.add(k); });
    (d.personajes || []).forEach(p => PEOPLE[p.id] = p);
    PLACES = (d.lugares || []).filter(p => Array.isArray(p.coordenadas)).map((p, i) => normPlace(p, i));
    PLACES.forEach(p => byId[p.id] = p);
    Object.keys(CATS).forEach(k => root.style.setProperty('--' + k, CATS[k].color || '#8a8172'));
    buildMarkers(); setLang(lang); homeView(false); if (ADJUST) renderAdjust();
    initMood(); buildEvents(); loadWeather(); tickClock();
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
  /* ---------- marcadores (punto de color, crece al pasar el cursor) ---------- */
  const NOHOVER = window.matchMedia && matchMedia('(hover: none)').matches;
  let pvId = null;
  function buildMarkers() {
    PLACES.forEach(p => {
      const el = document.createElement('div'); el.className = 'mlp-mk lv-' + p.nivel + (p.verificar ? ' is-approx' : ''); el.style.setProperty('--c', `var(--${p.categoria})`);
      if (p.logo) el.classList.add('has-logo');
      el.innerHTML = `<div class="mlp-pv"></div><div class="mlp-dot">${mark(p)}</div>${p.nivel === 'sobresaliente' ? '<b class="mlp-star" aria-hidden="true">★</b>' : ''}`;
      el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
      el.addEventListener('click', e => {
        e.stopPropagation(); if (el._dragged) { el._dragged = false; return; }
        if (NOHOVER && !ADJUST && pvId !== p.id && !e.target.closest('.mlp-pv')) { pvId = p.id; fillPreview(p); scheduleOverlay(); return; }
        pvId = null; openCard(p.id, null, !ADJUST);
      });
      el.addEventListener('mouseenter', () => fillPreview(p));
      el.addEventListener('keydown', e => { if (e.key === 'Enter') openCard(p.id, null, true); });
      p.el = el; p.marker = new maplibregl.Marker({ element: el, anchor: 'center', draggable: ADJUST }).setLngLat(p.coordenadas).addTo(map);
      if (ADJUST) {
        p.marker.on('dragstart', () => { el._dragged = true; });
        p.marker.on('dragend', () => { const ll = p.marker.getLngLat(); p.coordenadas = [+ll.lng.toFixed(5), +ll.lat.toFixed(5)]; adjChanged.add(p.id); el.classList.remove('is-approx'); renderAdjust(); });
      }
    });
  }
  function mark(p) { return p && p.logo ? `<img class="mlp-logo" src="${esc(p.logo)}" alt="" loading="lazy">` : icon(p.icono); }
  function fillPreview(p) {
    const pv = p.el.querySelector('.mlp-pv'), t = v => v == null ? '' : (typeof v === 'object' ? (v[lang] || v.es || '') : String(v));
    if (pv._lang === lang) return; pv._lang = lang;
    const short = t(p.descripcion_breve) || t(p.descripcion).split(/(?<=\.)\s/)[0];
    pv.innerHTML = `<b>${esc(t(p.nombre))}</b><span>${p.nivel === 'sobresaliente' ? '★ ' + UI[lang].rec + ' · ' : ''}${esc(t(CATS[p.categoria]))}</span><em>${esc(short.length > 90 ? short.slice(0, 88) + '…' : short)}</em><u>${UI[lang].open} ›</u>`;
  }
  function matches(p) {
    if (onlyRec && p.nivel !== 'sobresaliente') return false;
    if (showAll && !onlyRec) return activeCats.has(p.categoria);
    return activeCats.has(p.categoria) || (p.etiquetas || []).some(t => activeTags.has(t));
  }
  let ovRaf = 0;
  const scheduleOverlay = () => { if (!ovRaf) ovRaf = requestAnimationFrame(() => { ovRaf = 0; updateOverlay(); }); };
  function updateOverlay() {
    const zz = map.getZoom(), W = root.clientWidth, H = root.clientHeight, big = zz >= 16.2;
    for (const p of PLACES) {
      if (!p.el) continue;
      const pt = map.project(p.coordenadas); let mode;
      const minZ = p.prioridad === 1 ? 0 : p.prioridad === 2 ? 11.8 : 13.8;
      if (pt.x < -60 || pt.x > W + 60 || pt.y < -60 || pt.y > H + 60) mode = 'none';
      else if (ADJUST) mode = 'big';
      else if (matches(p)) mode = zz < minZ ? 'none' : (big || p.id === activeId ? 'big' : 'dot');
      else mode = (p.prioridad === 1 && !onlyRec) ? 'dim' : 'none';
      if (p.id === activeId) mode = 'big';
      const cls = 'm-' + mode + (p.id === activeId ? ' active' : '') + (p.id === pvId ? ' pv-on' : '');
      if (p._c !== cls) { p.el.classList.remove('m-big', 'm-dot', 'm-dim', 'm-none', 'active', 'pv-on'); cls.split(' ').forEach(c => p.el.classList.add(c)); p._c = cls; }
      p.el.style.zIndex = p.id === activeId || p.id === pvId ? 9999 : (p.nivel === 'sobresaliente' ? 2000 : 1000) + Math.round(pt.y);
    }
  }
  map.on('move', scheduleOverlay); map.on('resize', scheduleOverlay);
  root.querySelector('.mlp-pill').onclick = () => openToday();
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
    card.innerHTML = `<div class="mlp-hero${hero}"><button class="mlp-x" aria-label="×">×</button><div class="mlp-disc${p.logo ? ' has-logo' : ''}">${mark(p)}</div>${rank === 2 ? `<span class="mlp-recbadge">★ ${L.rec}</span>` : ''}</div>
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
  function closeCard() { card.classList.remove('open'); activeId = null; pvId = null; scheduleOverlay(); }
  map.on('click', () => { if (card.classList.contains('open') || pvId) closeCard(); });

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
    const L = UI[lang], names = chosen.map(id => (PROFILES.find(x => x.id === id) || {}).nombre).filter(Boolean).map(n => n[lang]);
    const moodTxt = showAll && !chosen.length ? L.all : names.join(', ');
    $('.mlp-chips').innerHTML = (PROFILES.length ? `<button class="mlp-chip mlp-moodchip" data-mood="1">✦ ${L.mood}: <em>${esc(moodTxt)}</em></button>` : '')
      + `<button class="mlp-chip mlp-recchip${onlyRec ? ' on' : ''}" data-rec="1">★ ${L.recs}</button>`
      + Object.keys(CATS).filter(k => !CATS[k].servicio).map(k => `<button class="mlp-chip${activeCats.has(k) ? ' on' : ' off'}" data-k="${esc(k)}" style="--c:var(--${k})"><i></i>${esc(CATS[k][lang])}</button>`).join('');
    const mc = root.querySelector('.mlp-moodchip'); if (mc) mc.onclick = () => openWelcome(true);
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
  const closeList = () => { list.classList.remove('open', 'wide'); scrim.classList.remove('open'); };
  $('.mlp-lh button').onclick = closeList; scrim.onclick = closeList;
  function setLang(l) {
    lang = l; const L = UI[l];
    root.querySelectorAll('.mlp-lang button').forEach(b => b.classList.toggle('on', b.dataset.l === l));
    $('.mlp-subtitle').textContent = L.sub; q.placeholder = L.q;
    const tips = { in: L.zin, out: L.zout, home: L.home, tilt: L.tilt, list: L.list, near: L.near, need: L.need, fs: L.fs };
    root.querySelectorAll('.mlp-controls button').forEach(b => { b.title = tips[b.dataset.a]; b.setAttribute('aria-label', tips[b.dataset.a]); });
    $('.mlp-compass').title = L.north;
    PLACES.forEach(p => { if (p.el) { const pv = p.el.querySelector('.mlp-pv'); pv._lang = null; p.el.setAttribute('aria-label', p.nombre[l]); } p._c = ''; });
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
    else if (a === 'need') openNeed();
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

  /* ---------- Hoy en La Paz: hora, clima, eventos, cupones, recomendados ---------- */
  const TZ = 'America/Mazatlan', LAPAZ = [-110.3128, 24.1617];
  let WX = null;
  const fmtTime = (d, opt) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', Object.assign({ timeZone: TZ, hour: 'numeric', minute: '2-digit' }, opt || {})).format(d);
  const fmtDate = (iso, opt) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', Object.assign({ timeZone: 'UTC', day: 'numeric', month: 'long' }, opt || {})).format(new Date(iso + 'T12:00:00Z'));
  function fmtRange(a, b) {
    const da = new Date(a + 'T12:00:00Z'), db = new Date(b + 'T12:00:00Z');
    if (da.getUTCMonth() === db.getUTCMonth()) return da.getUTCDate() + '–' + fmtDate(b);
    return fmtDate(a) + ' – ' + fmtDate(b);
  }
  function tickClock() { const c = root.querySelector('.mlp-clock'); if (c) c.textContent = fmtTime(new Date()); setTimeout(tickClock, 20000); }
  // atardecer (algoritmo NOAA simplificado)
  function sunset(date, lon, lat) {
    const rad = Math.PI / 180, day = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - Date.UTC(date.getUTCFullYear(), 0, 0)) / 864e5);
    const g = 2 * Math.PI / 365 * (day - 1 + .5), eq = 229.18 * (.000075 + .001868 * Math.cos(g) - .032077 * Math.sin(g) - .014615 * Math.cos(2 * g) - .040849 * Math.sin(2 * g));
    const dec = .006918 - .399912 * Math.cos(g) + .070257 * Math.sin(g) - .006758 * Math.cos(2 * g) + .000907 * Math.sin(2 * g) - .002697 * Math.cos(3 * g) + .00148 * Math.sin(3 * g);
    const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(dec)) - Math.tan(lat * rad) * Math.tan(dec)) / rad;
    const mins = 720 - 4 * (lon - ha) - eq; return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) + mins * 6e4);
  }
  const WXICON = s => !s ? '☀' : /thunder/.test(s) ? '⛈' : /snow|sleet/.test(s) ? '❄' : /rain|shower/.test(s) ? '🌧' : /fog/.test(s) ? '🌫' : /cloudy/.test(s) && !/partly/.test(s) ? '☁' : /partly|fair/.test(s) ? (/night/.test(s) ? '☾' : '⛅') : /night/.test(s) ? '☾' : '☀';
  function loadWeather() {
    const u = (DATA.config && DATA.config.clima) || cfg.weatherUrl; if (!u) return;
    fetch(u, { cache: 'no-cache' }).then(r => r.ok ? r.json() : null).then(j => {
      if (!j || typeof j.temp !== 'number') return; WX = j;
      root.querySelector('.mlp-temp').textContent = Math.round(j.temp) + '°'; root.querySelector('.mlp-wx').textContent = WXICON(j.simbolo);
    }).catch(() => {});
  }
  // eventos
  const today0 = () => { const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date()); return p; };
  const daysTo = iso => Math.round((Date.parse(iso + 'T00:00:00Z') - Date.parse(today0() + 'T00:00:00Z')) / 864e5);
  function eventState(e) { const a = daysTo(e.inicio), b = daysTo(e.fin); return b < 0 ? 'past' : a <= 0 ? 'now' : 'soon'; }
  function eventBadge(e) { const L = UI[lang], st = eventState(e), n = daysTo(e.inicio); return st === 'now' ? L.nowOn : n === 0 ? L.today2 : L.inDays.replace('{n}', n); }
  function upcoming() { return (DATA.eventos || []).filter(e => eventState(e) !== 'past' && daysTo(e.inicio) <= (e.mostrar_dias || 120)).sort((a, b) => a.inicio < b.inicio ? -1 : 1); }
  function buildEvents() {
    upcoming().forEach(e => {
      if (!e.coordenadas) return;
      const el = document.createElement('div'); el.className = 'mlp-evmk';
      el.innerHTML = `<div class="mlp-evcal"><b>${new Date(e.inicio + 'T12:00:00Z').getUTCDate()}</b><span>${fmtDate(e.inicio, { month: 'short' }).replace(/\d+\s*(de\s*)?/, '')}</span></div><div class="mlp-evlbl">${esc(e.nombre[lang])}</div>`;
      el.addEventListener('click', ev => { ev.stopPropagation(); openToday('ev:' + e.id); });
      e._mk = new maplibregl.Marker({ element: el, anchor: 'bottom' }).setLngLat(e.coordenadas).addTo(map);
    });
  }
  // cupones
  const COUP_KEY = 'mlp-cupones-v1';
  const rnd = n => { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let o = ''; const b = new Uint8Array(n); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach((_, i) => b[i] = Math.random() * 256); b.forEach(x => o += a[x % a.length]); return o; };
  function couponValid(c) { return daysTo(c.vence) >= 0; }
  function couponHTML(c, compact) {
    const L = UI[lang], biz = byId[c.negocio], mine = (store.get(COUP_KEY) || {})[c.id];
    return `<div class="mlp-coupon${compact ? ' compact' : ''}${couponValid(c) ? '' : ' expired'}" data-c="${esc(c.id)}" style="--cc:${esc(c.color || '#c0553a')}">
      <div class="mlp-cmain"><span class="mlp-ctype">${esc((L.couponTypes || {})[c.tipo] || c.tipo)}</span>${c.ejemplo ? `<span class="mlp-cex">${L.example}</span>` : ''}
        <b class="mlp-ctitle">${esc(c.titulo[lang])}</b><span class="mlp-cbiz">${esc(biz ? biz.nombre[lang] : (c.negocio_nombre || ''))}</span>
        ${compact ? '' : `<p class="mlp-cterms">${esc(c.condiciones ? c.condiciones[lang] : '')}</p>`}</div>
      <div class="mlp-cstub"><small>${L.until}</small><b>${esc(fmtDate(c.vence, { day: 'numeric', month: 'short', year: 'numeric' }))}</b>${mine ? `<code>${esc(mine.codigo)}</code>` : '<i>✂</i>'}</div>
      ${biz && biz.logo ? `<img class="mlp-clogo" src="${esc(biz.logo)}" alt="">` : '<span class="mlp-cstamp">LA PAZ · BCS</span>'}</div>`;
  }
  function downloadCoupon(c) {
    const L = UI[lang], all = store.get(COUP_KEY) || {};
    let mine = all[c.id], fresh = false;
    if (!mine) { mine = { codigo: `${c.prefijo || 'LPZ'}-${rnd(4)}-${rnd(2)}`, fecha: new Date().toISOString() }; all[c.id] = mine; store.set(COUP_KEY, all); fresh = true; }
    drawCouponPNG(c, mine.codigo);
    if (fresh) logRemote({ tipo: 'cupon', cupon: c.id, titulo: c.titulo.es, negocio: c.negocio, codigo: mine.codigo, vence: c.vence, perfil: chosen.join(','), idioma: lang, fecha: mine.fecha, pagina: location.href.split('?')[0] });
    toast(fresh ? L.saved : L.already, 2600);
    return mine.codigo;
  }
  function logRemote(obj) {
    const u = DATA && DATA.config && DATA.config.registroUrl; if (!u) return Promise.resolve(false);
    return fetch(u, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(obj) }).then(() => true).catch(() => false);
  }
  function drawCouponPNG(c, code) {
    const lb = byId[c.negocio];
    if (lb && lb.logo && c._logo === undefined) { const im = new Image(); im.onload = () => { c._logo = im; drawCouponPNG(c, code); }; im.onerror = () => { c._logo = null; drawCouponPNG(c, code); }; im.src = lb.logo; return; }
    const W = 1200, H = 560, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const g = cv.getContext('2d');
    const col = c.color || '#c0553a', biz = byId[c.negocio], L = UI[lang];
    g.fillStyle = '#f4e7c9'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(120,90,50,${Math.random() * .06})`; g.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
    g.strokeStyle = 'rgba(110,80,50,.12)'; g.lineWidth = 1; for (let k = -H; k < W; k += 9) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + H * .7, H); g.stroke(); }
    g.strokeStyle = col; g.lineWidth = 6; g.setLineDash([]); g.strokeRect(24, 24, W - 48, H - 48);
    g.lineWidth = 2; g.setLineDash([10, 8]); g.strokeRect(40, 40, W - 80, H - 80); g.setLineDash([]);
    g.strokeStyle = '#5b5048'; g.setLineDash([4, 10]); g.beginPath(); g.moveTo(860, 40); g.lineTo(860, H - 40); g.stroke(); g.setLineDash([]);
    g.fillStyle = col; g.font = '700 26px Nunito, sans-serif'; g.fillText(((L.couponTypes || {})[c.tipo] || c.tipo).toUpperCase(), 80, 110);
    g.fillStyle = '#3b3632'; g.font = '700 62px Kalam, Georgia, serif'; wrap(g, c.titulo[lang], 80, 190, 740, 68, 2);
    g.font = '700 30px Nunito, sans-serif'; g.fillStyle = '#5b5048'; g.fillText(biz ? biz.nombre[lang] : '', 80, 350);
    g.font = '24px Nunito, sans-serif'; wrap(g, c.condiciones ? c.condiciones[lang] : '', 80, 400, 740, 30, 3);
    g.fillStyle = '#5b5048'; g.font = '700 22px Nunito, sans-serif'; g.fillText(L.until.toUpperCase(), 895, 130);
    g.fillStyle = '#3b3632'; g.font = '700 34px Nunito, sans-serif'; g.fillText(fmtDate(c.vence, { day: 'numeric', month: 'short', year: 'numeric' }), 895, 175);
    g.fillStyle = '#5b5048'; g.font = '700 22px Nunito, sans-serif'; g.fillText(L.yourCode.toUpperCase(), 895, 270);
    g.fillStyle = col; g.font = '800 33px ui-monospace, Menlo, monospace'; g.fillText(code, 892, 318);
    if (c._logo) { const im = c._logo, s2 = Math.min(190 / im.naturalWidth, 170 / im.naturalHeight); g.drawImage(im, 1010 - im.naturalWidth * s2 / 2, 445 - im.naturalHeight * s2 / 2, im.naturalWidth * s2, im.naturalHeight * s2); }
    else { g.save(); g.translate(1010, 440); g.rotate(-.18); g.strokeStyle = col; g.globalAlpha = .7; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.stroke(); g.beginPath(); g.arc(0, 0, 58, 0, 7); g.stroke();
    g.fillStyle = col; g.font = '800 22px Nunito, sans-serif'; g.textAlign = 'center'; g.fillText('LA PAZ', 0, -4); g.font = '700 16px Nunito, sans-serif'; g.font = '700 13px Nunito, sans-serif'; g.fillText('BAJA CALIFORNIA SUR', 0, 20); g.restore(); }
    g.fillStyle = '#7d7266'; g.font = '18px Nunito, sans-serif'; g.fillText(location.host + location.pathname.replace(/index\.html$/, ''), 80, H - 62);
    cv.toBlob(b => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `cupon-${c.id}-${code}.png`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }, 'image/png');
    function wrap(g, txt, x, y, mw, lh, max) { const w = String(txt || '').split(' '); let line = '', n = 0; for (const t of w) { const test = line ? line + ' ' + t : t; if (g.measureText(test).width > mw && line) { g.fillText(line, x, y); y += lh; line = t; if (++n >= max - 1) { } } else line = test; } if (line) g.fillText(line, x, y); }
  }
  // banner de eventos (dibujo propio con los colores del carnaval)
  const BANNERS = {
    carnaval: e => `<svg class="mlp-banner" viewBox="0 0 640 220" role="img" aria-label="${esc(e.nombre[lang])}"><rect width="640" height="220" rx="16" fill="#fbecd9"/>
      <g opacity=".5">${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 97) % 640}" cy="${(i * 53) % 220}" r="${2 + (i % 3)}" fill="${['#e2468a', '#f29a2e', '#6a2f73', '#2f93a3'][i % 4]}"/>`).join('')}</g>
      <path d="M20 220 C70 140 40 90 90 40" fill="none" stroke="#8fae4a" stroke-width="10" stroke-linecap="round"/><path d="M50 220 C90 160 80 120 120 80" fill="none" stroke="#6f9a3a" stroke-width="8" stroke-linecap="round"/>
      <g transform="translate(560 30)">${Array.from({ length: 7 }, (_, i) => `<path d="M0 0 L${Math.cos(i * .9) * 60} ${Math.sin(i * .9) * 60 + 20} L${Math.cos(i * .9 + .3) * 60} ${Math.sin(i * .9 + .3) * 60 + 20}Z" fill="#e8622c"/>`).join('')}</g>
      <g transform="translate(250 22) scale(1.15)" stroke="#5a2a63" stroke-width="2" stroke-linejoin="round"><path d="M10 40 Q60 0 110 40Z" fill="#6a2f73"/><rect x="10" y="40" width="100" height="6" fill="#6a2f73"/><path d="M22 46v34M48 46v34M72 46v34M98 46v34" stroke-width="5"/><rect x="4" y="80" width="112" height="8" fill="#6a2f73"/></g>
      <g transform="translate(395 50) rotate(-12)"><path d="M0 18 C10 0 40 0 52 14 C64 0 94 0 104 18 C96 40 70 44 52 30 C34 44 8 40 0 18Z" fill="#e2468a" stroke="#5a2a63" stroke-width="2"/><ellipse cx="30" cy="20" rx="9" ry="6" fill="#fbecd9"/><ellipse cx="74" cy="20" rx="9" ry="6" fill="#fbecd9"/></g>
      <text x="320" y="160" text-anchor="middle" font-family="Kalam, cursive" font-weight="700" font-size="58" fill="#f08a1f" stroke="#7a3a10" stroke-width="1.2">${esc(e.titulo_banner || 'Carnaval La Paz')}</text>
      <rect x="90" y="172" width="460" height="34" rx="8" fill="#d6317a"/><text x="320" y="196" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="19" fill="#fff">${esc((e.lema || {})[lang] || '')} · ${esc(fmtRange(e.inicio, e.fin))}</text></svg>`
  };
  function openToday(focus) {
    if (!DATA) return;
    const L = UI[lang]; list._near = true;
    $('.mlp-lh b').textContent = L.today;
    const now = new Date(), ss = sunset(now, LAPAZ[0], LAPAZ[1]);
    const evs = upcoming(), coups = (DATA.cupones || []).filter(couponValid);
    const aff = (DATA.afiliados || []).map(id => byId[id]).filter(Boolean).slice(0, 6);
    const slots = aff.map(p => `<button class="mlp-aff" data-id="${esc(p.id)}" style="--c:var(--${p.categoria})"><span class="mlp-ic${p.logo ? ' has-logo' : ''}">${mark(p)}</span><b>${esc(p.nombre[lang])}</b><small>★ ${L.rec}</small></button>`);
    while (slots.length < 6) slots.push(`<a class="mlp-aff mlp-affempty" href="${esc((DATA.config && DATA.config.afiliadosUrl) || 'afiliados.html')}"><span class="mlp-ic">+</span><b>${L.yourBiz}</b><small>${L.yourBizSub}</small></a>`);
    $('.mlp-lb').innerHTML = `<div class="mlp-today">
      <div class="mlp-tnow"><div><b class="mlp-tbig">${WX ? Math.round(WX.temp) + '°' : '--°'}</b><span>${WX ? WXICON(WX.simbolo) : ''}</span></div>
        <div><b>${fmtTime(now)}</b><small>${(t => t.charAt(0).toUpperCase() + t.slice(1))(new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(now))}</small></div>
        <div><b>🌅 ${fmtTime(ss)}</b><small>${L.sunset}</small></div></div>
      ${WX ? `<small class="mlp-attr">${L.weatherBy} (CC BY 4.0)</small>` : ''}
      ${evs.length ? `<h4 style="--c:#d6317a"><i></i>${L.events}</h4>` + evs.map(e => `<div class="mlp-ev" data-ev="${esc(e.id)}">${BANNERS[e.banner] ? BANNERS[e.banner](e) : ''}<div class="mlp-evbody"><span class="mlp-evbadge">${eventBadge(e)}</span><b>${esc(e.nombre[lang])}</b><small>${esc(fmtRange(e.inicio, e.fin))} · ${esc(e.lugar ? e.lugar[lang] : '')}</small><p>${esc(e.descripcion ? e.descripcion[lang] : '')}</p><div class="mlp-actions">${e.coordenadas ? `<button class="mlp-btn" data-goev="${esc(e.id)}">📍 ${L.open}</button>` : ''}${e.enlace ? `<a class="mlp-btn" href="${esc(e.enlace)}" target="_blank" rel="noopener">${L.moreInfo} ↗</a>` : ''}</div></div></div>`).join('') : ''}
      ${coups.length ? `<h4 style="--c:#cf862c"><i></i>${L.coupons}</h4><div class="mlp-coups">${coups.map(c => couponHTML(c, true)).join('')}</div><div class="mlp-cdetail"></div>` : ''}
      <h4 style="--c:#e2b23a"><i></i>${L.partners}</h4><div class="mlp-affs">${slots.join('')}</div></div>`;
    const lb = $('.mlp-lb');
    lb.querySelectorAll('.mlp-coups .mlp-coupon').forEach(el => el.onclick = () => showCoupon(el.dataset.c));
    lb.querySelectorAll('[data-goev]').forEach(b => b.onclick = () => { const e = (DATA.eventos || []).find(x => x.id === b.dataset.goev); closeList(); map.flyTo({ center: e.coordenadas, zoom: 15.5, essential: true }); });
    lb.querySelectorAll('.mlp-aff[data-id]').forEach(b => b.onclick = () => { closeList(); openCard(b.dataset.id, null, true); });
    list.classList.add('open'); scrim.classList.add('open'); list.classList.add('wide');
    if (focus && focus.startsWith('ev:')) { const el = lb.querySelector(`[data-ev="${focus.slice(3)}"]`); if (el) setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }), 300); }
    if (focus && focus.startsWith('c:')) showCoupon(focus.slice(2));
  }
  function showCoupon(id) {
    const L = UI[lang], c = (DATA.cupones || []).find(x => x.id === id), box = $('.mlp-cdetail'); if (!c || !box) return;
    const mine = (store.get(COUP_KEY) || {})[c.id];
    box.innerHTML = couponHTML(c, false) + `<div class="mlp-actions">${mine ? `<div class="mlp-ccode"><small>${L.yourCode}</small><code>${esc(mine.codigo)}</code><span>${L.showAt}</span></div>` : ''}<button class="mlp-btn primary" data-dl="1">⬇ ${L.getCoupon}</button>${byId[c.negocio] ? `<button class="mlp-btn" data-biz="1">📍 ${L.open}</button>` : ''}</div>`;
    box.style.setProperty('--c', c.color || '#c0553a');
    box.querySelector('[data-dl]').onclick = () => { downloadCoupon(c); showCoupon(id); const k = $(`.mlp-coups [data-c="${id}"]`); if (k) k.outerHTML = couponHTML(c, true); $(`.mlp-coups [data-c="${id}"]`).onclick = () => showCoupon(id); };
    const bz = box.querySelector('[data-biz]'); if (bz) bz.onclick = () => { closeList(); openCard(c.negocio, null, true); };
    box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  /* ---------- perfiles: "¿Qué quieres descubrir hoy?" ---------- */
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const MOOD_KEY = 'mlp-mood-v1';
  let welcome = null, pick = [];
  function applyMood(ids) {
    chosen = ids.filter(id => PROFILES.some(p => p.id === id)).slice(0, 3);
    activeCats.clear(); activeTags.clear();
    if (!chosen.length) { showAll = true; Object.keys(CATS).forEach(k => { if (!CATS[k].servicio) activeCats.add(k); }); }
    else { showAll = false; chosen.forEach(id => { const pr = PROFILES.find(p => p.id === id); (pr.categorias || []).forEach(c => activeCats.add(c)); (pr.etiquetas || []).forEach(t => activeTags.add(t)); }); }
    renderChips(); scheduleOverlay();
  }
  function initMood() {
    if (!PROFILES.length || ADJUST) return;
    const saved = store.get(MOOD_KEY) || {};
    if (saved.noMostrar) applyMood(saved.perfiles || []);
    else openWelcome(false, saved.perfiles || []);
  }
  function openWelcome(fromChip, preset) {
    if (!PROFILES.length) return;
    pick = (preset || chosen).slice(0, 3);
    if (!welcome) { welcome = document.createElement('div'); welcome.className = 'mlp-welcome'; root.appendChild(welcome); }
    renderWelcome(); welcome.classList.add('open');
  }
  function renderWelcome() {
    const L = UI[lang], saved = store.get(MOOD_KEY) || {};
    welcome.innerHTML = `<div class="mlp-wbox mlp-panel" role="dialog" aria-modal="true" aria-label="${esc(L.wTitle)}">
      <div class="mlp-wtop"><div><b class="mlp-wt">${L.wTitle}</b><small class="mlp-wsub">${L.wSub} · <span>${pick.length}/3</span></small></div>
        <div class="mlp-lang mlp-panel"><button data-l="es" class="${lang === 'es' ? 'on' : ''}">ES</button><button data-l="en" class="${lang === 'en' ? 'on' : ''}">EN</button></div></div>
      <div class="mlp-wgrid">${PROFILES.map(p => `<button class="mlp-pcard${pick.includes(p.id) ? ' sel' : ''}${pick.length >= 3 && !pick.includes(p.id) ? ' full' : ''}" data-p="${esc(p.id)}" style="--c:${esc(p.color || '#c0553a')}">
        <span class="mlp-pic">${icon(p.icono)}</span><b>${esc(p.nombre[lang])}</b><small>${esc(p.lema ? p.lema[lang] : '')}</small><i class="mlp-check">✓</i></button>`).join('')}</div>
      <div class="mlp-wfoot"><label class="mlp-nomore"><input type="checkbox"${saved.noMostrar ? ' checked' : ''}> ${L.wNo}</label>
        <span class="mlp-spacer"></span><button class="mlp-btn" data-w="all">${L.wAll}</button><button class="mlp-btn primary" data-w="go">${L.wGo} ›</button></div></div>`;
    welcome.querySelectorAll('.mlp-pcard').forEach(b => b.onclick = () => {
      const id = b.dataset.p, i = pick.indexOf(id);
      if (i >= 0) pick.splice(i, 1); else if (pick.length < 3) pick.push(id); else return;
      renderWelcome();
    });
    welcome.querySelectorAll('.mlp-lang button').forEach(b => b.onclick = () => { setLang(b.dataset.l); renderWelcome(); });
    const close = ids => { const nm = welcome.querySelector('.mlp-nomore input').checked; store.set(MOOD_KEY, { perfiles: ids, noMostrar: nm }); welcome.classList.remove('open'); applyMood(ids); };
    welcome.querySelector('[data-w=go]').onclick = () => close(pick);
    welcome.querySelector('[data-w=all]').onclick = () => close([]);
  }

  /* ---------- Necesito…: servicios y emergencias ---------- */
  let svcOn = null, svcPopup = null;
  const SVC_LABEL = { atm: 'svcAtm', pharmacy: 'svcPharmacy', hospital: 'svcHospital' };
  function setSvc(k) {
    Object.keys(SVC).forEach(s => ['c', 't', 'n'].forEach(x => { const id = `svc-${s}-${x}`; if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', s === k ? 'visible' : 'none'); }));
    svcOn = k;
  }
  function openNeed() {
    const L = UI[lang]; list._near = true;
    $('.mlp-lh b').textContent = L.needTitle;
    const em = (DATA && DATA.emergencias) || [];
    $('.mlp-lb').innerHTML = Object.keys(SVC).map(k => `<div class="mlp-res mlp-svc${svcOn === k ? ' sel' : ''}" data-svc="${k}"><span class="mlp-ic mlp-svcic" style="--c:${SVC[k].color};background:${SVC[k].color};color:#fff">${SVC[k].txt}</span><div><b>${L[SVC_LABEL[k]]}</b></div></div>`).join('')
      + (svcOn ? `<div class="mlp-res" data-svc="off"><span class="mlp-ic">✕</span><div><b>${L.svcHide}</b></div></div>` : '')
      + `<div class="mlp-svcout"></div>`
      + (em.length ? `<h4 style="--c:#c0553a"><i></i>${L.svcEmerg}</h4>` + em.map(e => `<a class="mlp-res mlp-tel" href="tel:${esc(String(e.telefono).replace(/[^+\d]/g, ''))}"><span class="mlp-ic" style="--c:#c0553a">☎</span><div><b>${esc(e.telefono)} · ${esc(e.nombre[lang] || e.nombre.es)}</b><span>${esc(e.nota ? (e.nota[lang] || e.nota.es) : '')}</span></div></a>`).join('') : '');
    root.querySelectorAll('.mlp-lb [data-svc]').forEach(r => r.onclick = () => {
      const k = r.dataset.svc; if (k === 'off') { setSvc(null); openNeed(); return; }
      setSvc(k); openNeed();
      const run = () => listSvc(k);
      if (map.getZoom() < 14.5) { map.easeTo({ zoom: 15, center: meMk ? meMk.getLngLat() : map.getCenter(), duration: 700 }); map.once('idle', run); } else run();
    });
    list.classList.add('open'); scrim.classList.add('open');
  }
  function listSvc(k) {
    const out = root.querySelector('.mlp-svcout'); if (!out) return;
    const ref = meMk ? meMk.getLngLat().toArray() : map.getCenter().toArray(), seen = new Set();
    let feats = [];
    try { feats = map.querySourceFeatures('omt', { sourceLayer: 'poi', filter: svcFilter(k) }); } catch (e) {}
    const items = feats.map(f => { const c = f.geometry.type === 'Point' ? f.geometry.coordinates : null; const n = f.properties['name:' + lang] || f.properties.name || UI[lang][SVC_LABEL[k]]; return c && { c, n, d: distM(ref, c) }; })
      .filter(x => x && !seen.has(x.n + x.c.join()) && seen.add(x.n + x.c.join())).sort((a, b) => a.d - b.d).slice(0, 8);
    out.innerHTML = items.length ? `<h4 style="--c:${SVC[k].color}"><i></i>${UI[lang].svcNear}</h4>` + items.map((x, i) => `<div class="mlp-res" data-i="${i}"><span class="mlp-ic" style="--c:${SVC[k].color}">${SVC[k].txt}</span><div><b>${esc(x.n)}</b><span>${fmtD(x.d)}</span></div></div>`).join('') : `<p class="mlp-note">${UI[lang].svcNone}</p>`;
    out.querySelectorAll('[data-i]').forEach(r => r.onclick = () => { const x = items[+r.dataset.i]; closeList(); map.flyTo({ center: x.c, zoom: 17, essential: true }); svcPop(x.c, x.n); });
  }
  function svcPop(c, n) {
    if (svcPopup) svcPopup.remove();
    const div = document.createElement('div'); div.className = 'mlp-pop';
    div.innerHTML = `<b>${esc(n)}</b> <a class="mlp-btn" href="https://www.google.com/maps/dir/?api=1&destination=${c[1]},${c[0]}" target="_blank" rel="noopener">➜ ${UI[lang].go}</a>`;
    svcPopup = new maplibregl.Popup({ offset: 12 }).setLngLat(c).setDOMContent(div).addTo(map);
  }
  Object.keys(SVC).forEach(k => map.on('click', `svc-${k}-c`, e => { const f = e.features && e.features[0]; if (f) svcPop(f.geometry.coordinates, f.properties['name:' + lang] || f.properties.name || UI[lang][SVC_LABEL[k]]); }));

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
    const items = PLACES.filter(p => p.nivel !== 'basico' && matches(p))
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
      if (p.nivel === 'basico' || toasted.has(p.id) || !matches(p)) return;
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
