# Mapa interactivo de La Paz, BCS

Mapa ilustrado estilo lápiz de color sobre datos reales de OpenStreetMap: lugares históricos y turísticos, personajes, calles con su nombre, buscador de direcciones, español e inglés, y un velero y un catamarán en la bahía.

## Cómo verlo
- **Publicado:** activa GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root) y entra a `https://tripprowild.github.io/lapaz.map/`.
- **En tu computadora:** abre una terminal en esta carpeta y ejecuta `python3 -m http.server 8000`, luego entra a `http://localhost:8000`. Abrir `index.html` con doble clic no funciona.

## Cómo editar los lugares
Todo el contenido está en [`datos/lugares.json`](datos/lugares.json): lugares, categorías, personajes, referencias entre lugares, fotos, enlaces y rutas de los barcos. En GitHub se edita con el ícono del lápiz y se guarda con **Commit changes**.

- Las coordenadas van como `[longitud, latitud]`.
- `"verificar": true` marca una ubicación aproximada que falta revisar.
- `prioridad`: 1 se ve siempre, 2 al acercarse, 3 solo muy de cerca.

## Insertarlo en otra página
```html
<iframe src="https://tripprowild.github.io/lapaz.map/" style="width:100%;height:80vh;border:0;border-radius:16px" allowfullscreen></iframe>
```

## Créditos
Mapa base © OpenStreetMap, teselas de OpenFreeMap, búsqueda con Photon, motor MapLibre GL JS (licencia BSD-3 en `assets/vendor/LICENSE.txt`).
