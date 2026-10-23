# MATEMÁTICA CHALLENGE — Guía de uso e instalación

## Qué incluye

Prototipo MULTIJUGADOR real con servidor Node.js y actualización en vivo mediante Server-Sent Events (SSE). 5 preguntas sobre función y representación, dominio, evaluación de funciones, rectas y parábolas. Duración inicial: **5 minutos**. Cada acierto vale **4 puntos** (máximo 20). Ranking por **mayor cantidad de aciertos**, seguido por **menor tiempo transcurrido desde el inicio hasta la entrega**. El cronómetro es validado por el servidor; cada estudiante observa su avance individual y la clasificación colectiva en vivo. Al finalizar se muestran el podio/ranking, calificación y explicación de las respuestas. El docente puede exportar un archivo CSV que Excel abre.

## 1. Ejecutar en Windows 10/11 (sin pagos)

1. Instale **Node.js LTS** desde https://nodejs.org si aún no está instalado.
2. Descomprima `matematica_challenge.zip` en una carpeta, por ejemplo `C:\MatematicaChallenge`.
3. Abra esa carpeta en el Explorador de archivos; escriba `cmd` en la barra de direcciones y pulse Enter.
4. Ejecute `npm start` (alternativamente, `node server.js`). **No es necesario instalar paquetes con `npm install`.**
5. Entre desde el navegador a `http://localhost:3000`.
6. En **Panel docente**, elija **5 minutos**, pulse **Crear sala** y copie el código de seis cifras o enlace. Mantenga abierta la terminal.
7. Desde otro navegador o celular en la misma red Wi-Fi, utilice la IP local del equipo anfitrión: `http://IP_DE_SU_PC:3000`. Para conocer la IP en Windows, ejecute `ipconfig` y busque la dirección IPv4 de su adaptador (ejemplo ilustrativo: `192.168.1.50`). Puede ser necesario autorizar Node.js en el firewall de Windows para redes privadas.
8. Los estudiantes ingresan el código y su nombre. El docente ve los participantes y pulsa **Iniciar competencia**. Termina sola a los 5 minutos.
9. Pulse **Descargar resultados CSV (Excel)** en el panel docente al finalizar.

**IMPORTANTE:** `localhost` es solo para la computadora que ejecuta el servidor. Para estudiantes fuera de la misma red hay que desplegar el servidor en Internet. No basta con enviar el archivo HTML: **las funciones multijugador necesitan el servidor**.

## 2. Publicar para estudiantes de distintas redes

Se puede publicar como servicio web Node.js en plataformas que soporten procesos persistentes y SSE (por ejemplo, Render, Railway o VPS). Compruebe las condiciones y precios del proveedor antes de contratar. Ejemplo con Render:

1. Cree un repositorio privado en GitHub con `server.js`, `package.json` y la carpeta `public`.
2. En Render, cree un **Web Service** a partir del repositorio.
3. Runtime: **Node**. Build command: `npm install` (sin dependencias); Start command: `npm start`.
4. Establezca la variable de entorno `NODE_ENV=production` si lo desea; el servidor utiliza el `PORT` del proveedor.
5. Abra la URL HTTPS pública generada, cree una sala y comparta el enlace desde el panel docente.
6. Pruebe con dos teléfonos de distintas redes antes de utilizarlo en clase.

**Límites de esta versión:** salas, tokens, respuestas y rankings permanecen **en memoria**: un reinicio/reinicio automático del alojamiento elimina las salas y respuestas; las salas caducan a las 24 horas. Use **una sola instancia** del servidor: no se sincroniza con réplicas. La interfaz permite hasta 150 inscripciones por sala como límite de software, **sin garantía de rendimiento para 150 conexiones reales**. Para uso continuo/evaluaciones oficiales conviene Redis o una base de datos persistente, autenticación institucional, controles antifraude, logs y pruebas de carga. No almacene ni publique información personal sensible en esta versión. Los nombres y el ranking son visibles para todos los participantes.

## 3. Probar con varios estudiantes sin desplegar

Abra `http://localhost:3000` en el navegador del docente. Cree una sala. Abra ventanas de incógnito o use otros navegadores/dispositivos; cada uno se une con un nombre diferente. Inicie la sala y responda desde cada navegador. Verifique el cronómetro, barras de progreso, orden del ranking y archivo Excel CSV.

## 4. Personalizar preguntas

Edite `QUESTIONS` en `server.js`. Cada pregunta tiene `topic`, `q`, cuatro `options`, índice `answer` (0 a 3) y explicación `why`. Esta versión funciona con exactamente cinco preguntas. Reinicie el servidor para aplicar los cambios (las salas existentes se perderán).

## Reglas de evaluación

- 5 preguntas, cuatro alternativas por pregunta, una única respuesta correcta.
- 4 puntos por cada acierto; respuesta incorrecta o sin marcar = 0 puntos.
- El ranking se actualiza en vivo por aciertos, y el **tiempo de entrega desempata**. Antes de finalizar, el ranking preliminar también incluye a quienes siguen respondiendo.
- Un participante que no entrega manualmente queda entregado automáticamente al vencimiento del tiempo; sus respuestas ya guardadas se califican.
- Las soluciones se revelan a todos los participantes cuando termina la competencia.
- No existe inicio de sesión institucional; los participantes deben usar nombres distintos dentro de una misma sala.
