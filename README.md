# MATEMÁTICA CHALLENGE 4.0 — SÍLABOS 2026-2

## Cambios
- Incluye **los cinco cursos** de los sílabos PDF suministrados.
- El selector **Curso → Tema** presenta la estructura académica, y muestra los subtemas correspondientes.
- Preserva las salas multijugador, cronómetro, respuestas, ranking en vivo, resultado sobre 20 y descarga de CSV.
- Reutiliza preguntas de la versión 3 solo en temas compatibles. La incorporación de un tema al sílabo **no implica** que tenga un banco suficiente.
- Temas sin cinco preguntas quedan visibles, pero impiden crear competencias hasta completar el banco.
- En `silabos_2026_2.json` están los cursos, temas, subtemas y el documento fuente; en `preguntas.json` los ejercicios existentes asignados.

## Para actualizar GitHub y Render
1. Guarda una copia de tu repositorio actual.
2. Descomprime este ZIP.
3. En GitHub, repositorio `PETTER463/AULA-INTERACTIVA`, reemplaza `server.js`, `package.json`, `preguntas.json`, `Dockerfile`, y los archivos de `public/`; **agrega `silabos_2026_2.json`**.
4. Usa **Agregar archivo → Cargar archivos** en la raíz (no subas la carpeta contenedora). Haz **Commit changes**.
5. En Render, verifica el despliegue automático o **Manual Deploy → Deploy latest commit**. Espera estado **Live**.
6. Abre `https://aula-interactiva-sr9y.onrender.com` y pulsa Ctrl+F5. Verifica selector de los cinco cursos.

## Importante
- El sílabo de Cálculo 3 es de **16 semanas**; el de Taller de Pensamiento Numérico corresponde a **8 semanas**.
- El banco existente se reutiliza como material de práctica, no como preguntas emitidas por la universidad. Revisar su pertinencia matemática antes de evaluaciones oficiales.
- Editor requiere variable `ADMIN_PIN` de 6+ caracteres en Render. Persistencia en disco local **no durable** en Render Free; exporta o incorpora los cambios al archivo JSON de GitHub.
- Las salas y resultados en memoria desaparecen al reiniciar; no lo uses como registro oficial de notas.
- No reemplaza las rúbricas ni evaluaciones institucionales del sílabo.
