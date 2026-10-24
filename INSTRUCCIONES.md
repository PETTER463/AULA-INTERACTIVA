# Matemática Challenge 8.0 — GitHub y Render

1. Descarga una copia de seguridad de tu repositorio actual.
2. Descomprime este ZIP. En GitHub reemplaza `server.js`, `package.json`, `public/app.js`, `public/index.html`, `public/style.css` y conserva/sube `public/backgrounds/`, `lib/qr/`, `preguntas.json`, `silabos_2026_2.json`, `Dockerfile`.
3. Confirma el commit en `main`. En Render verifica `Live` y actualiza con Ctrl+F5.
4. Prueba en dos navegadores diferentes: docente crea sala, estudiante entra con enlace/QR y avatar, docente inicia, pausa y reanuda, responde, activa ronda sorpresa y finaliza.
5. Torneos: el campo «Torneo / sección» etiqueta las salas y el historial; agrupa salas archivadas dentro del historial docente y muestra promedio por sección. No es un sistema permanente de ligas, y requiere conservar el historial.
6. Las preguntas con gráfica permiten explorar puntos; la respuesta evaluada sigue siendo de opción múltiple.
7. Los premios no cambian la nota académica de 20; las preguntas sorpresa son anuncios visuales, no preguntas extra.
8. Las soluciones se muestran por bloques tras finalizar, según las explicaciones existentes.
9. Render Free guarda salas en memoria e historial local efímero. Descarga el CSV al finalizar; para conservar historial permanente necesitarás base de datos.
10. Chrome puede exigir pulsar «Activar música» antes de reproducirla; el navegador del docente puede entrar en pantalla completa.

## Comprobación
`node --check server.js` y `node --check public/app.js`, después `node server.js` y visita `http://localhost:3000`.
