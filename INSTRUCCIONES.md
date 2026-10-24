# Matemática Challenge 3.0 — AULA INTERACTIVA

## Novedades
- Cursos: Matemática Básica, Cálculo I, Cálculo II, Cálculo III, Álgebra Lineal y Matemática Discreta.
- Selección de temas y entre 5, 10, 15 o 20 preguntas según banco disponible.
- Cinco niveles/opciones de duración y filtro de dificultad. Los temas precargados contienen niveles Básico e Intermedio; el nivel Avanzado se puede incorporar desde el editor.
- Multijugador, salas de 6 dígitos, ranking en vivo, cronómetro y reporte CSV conservados.
- Editor web para agregar preguntas con PIN del docente (variable de entorno ADMIN_PIN).

## Actualizar GitHub y Render
1. Descomprime el ZIP.
2. En GitHub, repositorio PETTER463/AULA-INTERACTIVA, **Add file > Upload files**.
3. Arrastra **el contenido de la carpeta Matematica_Challenge_v3**, no la carpeta externa. Deben quedar en la raíz `server.js`, `package.json`, `preguntas.json`, `Dockerfile` y dentro de `public`: `app.js`, `index.html`, `style.css`.
4. Confirma los cambios. Render debería iniciar automáticamente el despliegue, o ejecuta **Manual Deploy > Deploy latest commit**.
5. Verifica **Live** y abre https://aula-interactiva-sr9y.onrender.com. Actualiza con Ctrl+F5.
6. Para habilitar **Administrar preguntas**, en Render > tu servicio > **Environment**, agrega `ADMIN_PIN` con una clave privada de **6 o más caracteres**, guarda y redepliega. No compartas el PIN con estudiantes.

## Advertencia esencial sobre persistencia
En Render Free, los cambios que agregues con el editor se guardan en `preguntas.json` del contenedor **temporal**. Pueden desaparecer al reiniciar el servicio o publicar una nueva versión. Para uso prolongado, copia regularmente las preguntas al `preguntas.json` de GitHub o incorpora base de datos persistente (la edición web actual es demostrativa, no almacenamiento duradero). Las salas y respuestas también están en memoria. Usa una sola instancia del servidor.

## Consejos
- Cada sala recibe una selección aleatoria; todos los participantes de esa sala reciben las mismas preguntas.
- Si eliges más preguntas de las disponibles en un tema/nivel, el programa informa el límite.
- Para una prueba local: `node server.js` y visita http://localhost:3000.
- El banco inicial tiene ejercicios comprobables de nivel básico/intermedio. Revisa y adapta el material antes de usarlo en evaluaciones oficiales.
