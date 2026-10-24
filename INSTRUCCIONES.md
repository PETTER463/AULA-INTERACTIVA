# Instalar Matemática Challenge 6.1 (compartir enlace y QR)

## Qué contiene
Todos los archivos para reemplazar la versión 6.0: server.js, preguntas.json, silabos_2026_2.json, package.json, Dockerfile, public/ y lib/qr/. Es importante subir **lib/qr** porque allí está el generador de código QR sin conexión con proveedores externos. Conserva las cinco materias y sus bancos.

## Actualización en GitHub
1. Descarga este ZIP y descomprímelo. No lo subas comprimido.
2. Abre https://github.com/PETTER463/AULA-INTERACTIVA en sesión.
3. Primero realiza una copia de seguridad con Code → Download ZIP.
4. Usa Agregar archivo → Cargar archivos para subir **el contenido de la carpeta** Matematica_Challenge_v6_Compartir_QR, no la carpeta contenedora. Permite el reemplazo de rutas existentes y conserva public/ y lib/qr/.
5. Confirma los cambios en la rama main.
6. Render debería desplegar automáticamente. Si no, en AULA-INTERACTIVA → Deploys → Manual Deploy → Deploy latest commit. Espera a Live.

## Compartir competencia
1. Abre https://aula-interactiva-sr9y.onrender.com y crea una sala.
2. Verás **código de seis dígitos**, **enlace directo**, **QR**, **Compartir invitación** y **Descargar QR**.
3. Escanea el QR desde el celular usando datos móviles: la página debe abrir con el código de sala ya escrito. El estudiante solo ingresa sus nombres.
4. Comparte el enlace por WhatsApp o Blackboard; usa el archivo SVG de QR en una diapositiva.
5. Comprueba que aparezca el participante en panel docente. Inicia la sala y prueba ranking y entrega desde dos equipos.

## Precauciones
- El QR está vinculado a una **sala concreta**. Una sala nueva obtiene código, enlace y QR distintos.
- El dominio del sitio permanece fijo mientras Render mantenga esa dirección, pero las salas se guardan en memoria y **se pierden al reiniciar el servicio**. Crea nuevas salas después de cada publicación.
- El enlace/QR sirve para **ingresar como estudiante**, no revela el token del docente.
- El plan Render Free puede dormir tras inactividad; abre la web antes de clase y comprueba su disponibilidad.
- El historial JSON local no es almacenamiento persistente en Render gratuito: descarga CSV después de cada competencia y considera base de datos.
- Para evaluaciones oficiales, protege el acceso al panel docente, limita ingresos duplicados y revisa la exactitud de los bancos.

## Prueba local
En una terminal dentro de la carpeta del proyecto: `node server.js`. En Chrome: http://localhost:3000. El QR local usa localhost, por tanto **no se comparte por Internet** hasta desplegar en Render.
