# Matemática Challenge 7.2 — Pantalla completa y música

## Actualizar GitHub / Render

1. Realiza copia de seguridad de tu repositorio actual (GitHub → Code → Download ZIP).
2. Extrae este paquete. Carga los archivos y carpetas a la **raíz** del repositorio, conservando `public`, `lib` y `data`. GitHub debe reemplazar `server.js`, `public/app.js` y `public/style.css`; no coloques una carpeta adicional alrededor.
3. Confirma los cambios y observa el despliegue automático en Render, hasta que indique **Live**.
4. Entra a la página y crea una sala de prueba, preferentemente con al menos dos participantes en navegadores distintos.

## Carrera a pantalla completa

En el panel docente pulsa **⛶ Carrera a pantalla completa**. El tablero ocupa toda la pantalla; si el navegador lo permite también activa el modo fullscreen del sistema. Para salir usa el botón **Salir de pantalla completa** o Escape. Se actualiza mediante los eventos enviados por el servidor, y las filas cambian según la clasificación por aciertos y tiempo. Las barras muestran el número de respuestas contestadas, **no** el lugar del ranking.

## Música

Cuando el docente pulsa **Iniciar competencia** se habilita una melodía instrumental sintetizada y repetitiva. Se controla desde **Música ON/OFF** y **Activar música**. No consume créditos ni usa pistas comerciales. El navegador puede bloquear la reproducción si aún no hubo interacción con el botón; por ello existe **Activar música**. La melodía se reproduce en el dispositivo del docente que inicia la competencia, no en todos los teléfonos automáticamente, debido a restricciones de reproducción del navegador.

## Pruebas

- Crear sala de 5 preguntas y 5 minutos, abrir en otra computadora o celular.
- Confirmar actualización del número de aciertos y barras después de cada respuesta.
- Confirmar las flechas de subidas y bajadas al cambiar de posición.
- Probar modo pantalla completa, botón Salir y Escape.
- Probar música, silenciar y detener al finalizar.
- Probar clasificación final y exportación CSV.

## Limitaciones

Los registros del historial almacenados solo en el contenedor de Render gratuito pueden perderse después de reinicios. Para guardar resultados de manera permanente es necesaria una base de datos externa. Antes de usarlo para notas oficiales hay que hacer una prueba con participantes reales.
