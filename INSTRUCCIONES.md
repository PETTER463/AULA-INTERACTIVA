# Matemática Challenge 6.0 — instalación, Render y pruebas

## Contenido

Esta actualización parte de la versión 5 y conserva los **cinco cursos, 46 temas oficiales de los sílabos 2026-2 y el banco existente de 1.011 preguntas**; agrega **36 preguntas de funciones con gráficas SVG interactivas**, para un total de **1.047**. Las gráficas permiten mover un punto con un deslizador y explorar la función. El resto de preguntas continúan con alternativas de opción múltiple, sin gráfica. Se mantienen las salas multijugador, ranking por aciertos y tiempo como desempate, código de seis dígitos y calificaciones sobre 20.

### Nuevas funciones
- Podio animado para tres primeros puestos al terminar.
- Rachas de aciertos, indicador 🔥 e insignia 🏅 al alcanzar cinco aciertos consecutivos; **no modifica la nota académica**.
- Sonido breve al responder e iniciar/finalizar, con botón de silencio 🔊/🔇.
- Gráficas SVG interactivas en preguntas seleccionadas de Funciones Reales.
- Solucionario del banco al finalizar con justificación (calidad variable: revisar antes de evaluar oficialmente).
- Panel docente con entregas, progreso por participante, respuestas y ranking.
- Exportación a CSV compatible con Excel y un archivo .xls básico (HTML que Excel podría advertir sobre formato; **CSV es el recomendado**).
- Historial de salas finalizadas y estudiantes, bajo PIN docente; descarga CSV. El historial se guarda en archivo JSON local y se vuelve a leer tras reiniciar si la carpeta sobrevive.

## Advertencia importante sobre la permanencia del historial

**Render Free tiene sistema de archivos efímero.** Los datos del historial creados durante las competencias pueden **perderse con reinicios, actualizaciones y recreación de contenedores**. Para guardar historial con garantía a largo plazo se requiere un almacenamiento externo persistente (por ejemplo, PostgreSQL/Supabase mediante integración adicional) o un disco persistente en un plan que lo permita. `HISTORY_FILE=/ruta/persistente/historial.json` sirve si realmente se monta un volumen durable. Esta versión **no incorpora todavía una base de datos externa**. Descarga los CSV al finalizar cada sesión como respaldo. Las salas activas permanecen solo en memoria y se pierden al reiniciar.

## Actualización en GitHub

1. Descomprimir `MatematicaChallenge_v6_GitHub_Render.zip`.
2. Abrir https://github.com/PETTER463/AULA-INTERACTIVA y entrar con la cuenta que tiene permisos de escritura.
3. Antes de actualizar, descargar una copia de la versión actual: botón **Code / Código → Download ZIP**.
4. **Add file / Agregar archivo → Upload files / Cargar archivos**. Arrastrar **el contenido interior** de la carpeta `Matematica_Challenge_v6` (no la carpeta entera, ni el ZIP).
5. Asegurarse de que `server.js`, `package.json`, `Dockerfile`, `preguntas.json`, `silabos_2026_2.json` y la carpeta `public/` queden en la raíz del repositorio. GitHub debe identificar los archivos existentes como reemplazos.
6. Confirmar cambios (**Commit changes**) en la rama principal que utiliza Render (puede mostrarse como `main` si la traducción del navegador está desactivada).
7. No subir las carpetas `node_modules` ni `data` con resultados de estudiantes. No subir PIN ni secretos.

## Render

1. Abrir https://dashboard.render.com → `My project` → `AULA-INTERACTIVA` → `Deploys`.
2. Normalmente se inicia un Auto-Deploy. De otro modo, usar **Manual Deploy → Deploy latest commit**.
3. Confirmar que el estado final sea **Live**; el enlace actual es https://aula-interactiva-sr9y.onrender.com .
4. En **Environment** crear `ADMIN_PIN` con un valor secreto de 8 o más caracteres. Nunca publicarlo en GitHub ni compartirlo con estudiantes. Este PIN protege el editor y el historial (no las salas; el anfitrión usa token de sala).
5. Opcional `HISTORY_FILE` solo si dispone de volumen realmente persistente. No configurar una ruta arbitraria creyendo que será persistente en Render Free.
6. Durante la clase, abrir la página antes de compartir el enlace para reactivar el servicio del plan gratuito si está suspendido.

## Prueba funcional recomendada

1. Entrar a la web desde Chrome en PC y crear una sala de 5 preguntas, 5 minutos, en Cálculo → Función real de variable real → Intermedio.
2. Entrar como estudiante en otra computadora/celular usando el código y enlace público.
3. Verificar que aparece en la lista de participantes y pulsa **Iniciar competencia**.
4. Contestar preguntas, probar una gráfica cuando salga (son aleatorias: quizá debas crear otra sala), barra de avance, botones de sonido y racha.
5. Entregar antes del tiempo y comprobar que aparecen las entregas y la posición.
6. Terminar desde el panel docente para comprobar podio, soluciones, puntuación y exportación CSV/Excel.
7. Volver al inicio, abrir **Historial y estadísticas**, escribir el `ADMIN_PIN`, comprobar registro de la sala y descargar el CSV completo.
8. Hacer copia de los informes. Para pruebas de reconexión, no reiniciar el servicio durante una competencia real.

## Windows local

Instala Node.js 18 o posterior. En una terminal situada junto a `server.js`, ejecuta `node server.js` (o doble clic en `INICIAR_WINDOWS.bat`). Abre http://localhost:3000 . Para probar el historial local con PIN: `set ADMIN_PIN=12345678` antes de iniciar el servidor desde la misma consola. No utilices ese PIN de ejemplo en Internet.

## Notas pedagógicas

Los 1.011 ítems anteriores se conservan tal cual. Las 36 preguntas gráficas nuevas usan representaciones de rectas y parábolas y cuentan con respuestas y sustituciones numéricas. Se recomienda auditar la exactitud y riqueza didáctica de todos los ítems antes de usar la plataforma para evaluaciones oficiales.
