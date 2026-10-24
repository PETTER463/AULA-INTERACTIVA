# MATEMÁTICA CHALLENGE 7.0

Conserva los cinco cursos y bancos de preguntas de la versión 6.1.

## Novedades
- Fondos automáticos mediante patrones CSS locales, según el curso/tema.
- Dos comodines **por participante y por competencia**: pista conceptual general y 50/50 (se eliminan dos distractores).
- Modalidad individual o **por equipos**, hasta seis equipos. Los resultados del equipo son el promedio de las notas de sus participantes.
- Ranking individual y ranking por equipos en vivo.
- Conserva enlace QR, podio, historial, preguntas y exportaciones.

**Nota pedagógica:** La pista es general (no generada por IA ni personalizada para cada pregunta). Las ayudas no alteran la nota; el 50/50 únicamente oculta distractores. Los nombres de equipo se eligen al ingresar. La comparación por equipos usa el promedio de notas y no afecta la clasificación individual.

## Despliegue
1. Haz copia de seguridad del repositorio anterior.
2. Descomprime el ZIP, sube **todo su contenido**, conservando las carpetas `public/` y `lib/qr/`, a la raíz del repositorio Github. Reemplaza `server.js`, `package.json`, `Dockerfile` y archivos de `public/`.
3. Confirma cambios en la rama `main` y observa Render → Deploys hasta `Live`.
4. Abre la misma URL https://aula-interactiva-sr9y.onrender.com.
5. Prueba una sala por equipos con dos navegadores distintos y dos equipos.

En Render Free el historial local y las salas activas pueden desaparecer con reinicios; descarga los reportes luego de cada sesión. No uses la misma ventana de navegador para docente y estudiante, pues se guarda una única sesión local.
