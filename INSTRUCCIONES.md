# Matemática Challenge 7.1 — actualización GitHub y Render

## Incluye
- Panel docente de carreras con puestos que cambian en tiempo real, flechas de subida/bajada, barras de avance, número de respuestas, aciertos y entregas. Usa las notificaciones SSE ya existentes.
- 25 ejercicios nuevos, revisados matemáticamente, sobre temas distintos de los cinco sílabos: banco total 1072. No usa ninguna API de IA ni genera cargos por IA.
- Conserva salas, código QR, fondos temáticos, comodines, equipos, soluciones, reportes y el PIN docente.
- **No incluye** cobros, registro con contraseña ni generación automática con IA; esas serán fases posteriores con base de datos, autenticación y proveedor de pagos.

## Instalación
1. Descarga y guarda copia del repositorio anterior de GitHub (Code > Download ZIP). No subas archivos privados de estudiantes.
2. Descomprime este ZIP y sube el CONTENIDO de la carpeta Matematica_Challenge_v7_1 a la RAÍZ de PETTER463/AULA-INTERACTIVA, reemplazando server.js, package.json, preguntas.json, public/app.js, public/style.css y conservando public/index.html, Dockerfile, silabos_2026_2.json, lib y otros archivos. No subas una carpeta extra anidada.
3. En GitHub pulsa Commit changes. En Render comprueba que Deploys quede Live; si no se inicia, Manual Deploy > Deploy latest commit.
4. Abre https://aula-interactiva-sr9y.onrender.com y crea sala. Deja abierta la pantalla docente; desde dos celulares con datos móviles ingresa con el QR. Responde preguntas en momentos distintos: comprobarás que los puestos y el corredor se mueven en directo.
5. Comprueba que el banco muestre la cifra nueva y que la sala se cierre; descarga CSV de resultados.

## Pruebas locales
Node.js 18 o superior: `node server.js` y abrir http://localhost:3000. El servicio usa el puerto PORT de Render.

## Pendiente para monetización futura
Registro/autenticación docente-alumno, persistencia real (por ejemplo PostgreSQL), planes y roles, pasarela de pagos con confirmación webhook del servidor y HTTPS, tratamiento de datos, términos y privacidad, panel administrador y límites de uso. La IA puede añadirse en una versión posterior bajo demanda, usando clave API solo del lado del servidor. **No se almacenan datos de tarjetas en la aplicación.**

## Advertencia sobre Render gratis
Los datos de salas e historial JSON local se pueden perder al reiniciar el servicio. Exporta resultados; antes de vender acceso, añade una base de datos persistente y protección de acceso de estudiantes.
