# Every Occasion Landing Page

Landing estática de Every Occasion: recuerdos y obsequios personalizados (velas con forma, recuerditos para eventos y fragancias).

## Abrir

Abre `index.html` directamente en el navegador.

## Datos pendientes

Busca `___` en el proyecto y reemplázalo con la información real:

- `script.js`: `WHATSAPP_NUMBER`, en formato internacional y solo dígitos (ej. `52` + 10 dígitos). Mientras no esté, los botones de WhatsApp abren Instagram.
- `index.html`: precio desde, zona de entrega, días de elaboración y forma de pago. Aparecen en el hero y en el CTA final.

Los mensajes de WhatsApp de cada botón están en su atributo `data-wa-text`.

## Catálogo de muestras

1. Guarda las fotos en `assets/catalogo/` (por ejemplo `navidad-1.jpg`).
2. En `catalogo.js`, agrega una línea por foto dentro de `CATALOGO`:

   ```js
   { foto: "assets/catalogo/navidad-1.jpg", grupo: "navidad", nombre: "Pino nevado", detalle: "Aroma canela" },
   ```

   `nombre` y `detalle` son opcionales. `grupo` debe ser una de las claves de `GRUPOS`:
   - Temporadas: `san-valentin`, `dia-de-las-madres`, `halloween`, `dia-de-muertos`, `navidad`
   - Momentos de vida: `cumpleanos`, `bautizo`, `primera-comunion`, `xv-anos`, `boda`, `baby-shower`, `graduacion`

Mientras `CATALOGO` esté vacío, la sección y su enlace del menú no aparecen. Solo se muestran los grupos que tienen fotos.

## Secciones

- `#productos`: qué hacen (recuerdos para eventos, velas con forma, fragancias) y qué se personaliza.
- `#ocasiones`: cada ocasión abre WhatsApp con un mensaje ya escrito.
- `#como-pedir`: los tres pasos del pedido.

## Imágenes

La página usa `assets/hero-candles-1536.jpg` y `assets/hero-candles-900.jpg` (versiones comprimidas). `hero-candles.png` es el original y ya no se carga.

La versión anterior de la página está en `version-anterior/`.

## Instagram

Los botones principales apuntan a:

https://www.instagram.com/everyoccasiion
