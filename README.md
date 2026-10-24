# Matemática Challenge v2 — Funciones reales

Servidor multijugador Node.js sin dependencias externas. Banco de **25 preguntas**: se seleccionan **5 sin repetición, al azar por sala**. Puntuación sobre 20; desempate por tiempo. Las respuestas no se envían hasta el final.

## Inicio
`npm start` o `node server.js`, luego abrir `http://localhost:3000`.

## Render
Reemplaza server.js y public/app.js, añade preguntas.json y conserva el Dockerfile. El despliegue automático se activará tras el commit.

## Limitaciones
Las salas viven en memoria y se pierden al reiniciar la instancia. Alojamiento Free puede suspenderse por inactividad. Antes de utilizarlo para una evaluación calificada, realizar prueba con dos navegadores. Los resultados se descargan desde el panel docente. Sin autenticación del docente más allá del token de sala: no usar para exámenes de alta seguridad.
