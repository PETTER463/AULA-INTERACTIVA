# MATEMÁTICA CHALLENGE V2 — Instalación y actualización

## Qué cambia
- **25 preguntas revisadas** de Funciones reales (5 áreas temáticas, 5 preguntas por área).
- Cada vez que el docente crea una sala, el servidor **selecciona 5 preguntas diferentes al azar, sin repetición dentro de esa sala**. Entre dos salas puede coincidir alguna pregunta, lo cual es normal.
- Tiempo predeterminado de **5 minutos**, nota sobre **20**, ranking de mayor cantidad de aciertos; el tiempo transcurrido desempata a participantes que hayan entregado.
- Los estudiantes de una misma sala reciben las mismas 5 preguntas, para una competencia comparable. El avance y ranking se actualizan en vivo.
- Se conservan código de sala, panel docente, modo individual, enlaces para compartir, entrega, CSV y solucionario final.

## Actualizar el GitHub PETTER463/AULA-INTERACTIVA
1. Descarga `Matematica_Challenge_v2_GitHub_Render.zip` y **extrae** su contenido en Windows.
2. Entra a https://github.com/PETTER463/AULA-INTERACTIVA e inicia sesión.
3. Abre **Agregar archivo → Cargar archivos**.
4. Abre la carpeta **Matematica_Challenge_v2** descomprimida y arrastra **los archivos que contiene**, no la carpeta contenedora ni el ZIP. La raíz del repositorio debe mostrar `server.js`, `package.json`, `preguntas.json`, `Dockerfile` y `public/`.
5. GitHub puede pedir confirmar la sustitución de archivos existentes. Debes **reemplazar** `server.js` y `public/app.js` por las nuevas versiones. Asegúrate de que `public/index.html` y `public/style.css` sigan bajo la carpeta `public`.
6. Presiona **Commit changes** en la rama principal (`main`). Si el navegador traduce los nombres del código, elige «Mostrar original» antes de revisarlos.
7. En Render → AULA-INTERACTIVA → Deploys revisa el nuevo despliegue automático o usa **Manual Deploy → Deploy latest commit**. Debe indicar **Live**.
8. Abre https://aula-interactiva-sr9y.onrender.com y usa `Ctrl+Shift+R` para actualizar la caché. Si tenías una sala abierta de la versión antigua, pulsa **Salir de la sala** y crea una nueva; no es posible recuperar salas anteriores al reinicio.

## Prueba de dos dispositivos
1. En la computadora del docente: crea una sala, tema «Funciones reales», 5 preguntas aleatorias y 5 minutos.
2. En un celular con datos móviles: abre el enlace de la sala y registra un nombre de prueba.
3. Verifica que el docente vea el participante y pulsa «Iniciar competencia».
4. Responde preguntas desde el celular; confirma avance, ranking, entrega y el resultado final.
5. Crea una **segunda sala**: debería aparecer una selección diferente de cinco preguntas en la mayoría de los intentos.

## Desarrollo local
Con Node.js 18+ ejecuta `npm start` en la carpeta que contiene `server.js`; abre http://localhost:3000.

## Importante
El servidor guarda salas y respuestas **solo en memoria**, por lo que un reinicio de Render puede borrar la sesión. No se recomienda usar la edición gratuita para exámenes oficiales sin respaldo de resultados. El banco `preguntas.json` está incluido en un repositorio público y contiene claves de respuesta: es apropiado para práctica, no es un examen seguro. El panel docente se autentica con el token privado que recibe al crear la sala; no hay aún cuenta institucional ni persistencia de notas.
