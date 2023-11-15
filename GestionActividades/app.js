const express = require('express');
const expressListEndpoints = require('express-list-endpoints');
const dbConnection = require('./infraestructura/conexion/db'); // Asegúrate de usar la ruta correcta al archivo db.js
const incidentRoutes = require('./aplicacion/rutas/incidentRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar JSON en el cuerpo de la solicitud
app.use(express.json());

// Middleware para analizar datos codificados en la URL en el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));

// Configura tus rutas
app.use('/incidentes', incidentRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Hubo un error en el servidor' });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  console.log('Rutas registradas en la aplicación:');
  console.log(expressListEndpoints(app));
});

