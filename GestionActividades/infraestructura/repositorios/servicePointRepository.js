const connection = require('../conexion/conex');
const queries = require('../consultas/queries');

async function insertServicePoint(latitud, longitud, direccion) {
  return new Promise((resolve, reject) => {
    connection.query(queries.insertNewServicePoint, [latitud, longitud, direccion], (error, results) => {
      if (error) {
        console.error('Error al insertar datos en la base de datos:', error);
        reject(error);
      } else {
        console.log('Datos guardados en la tabla PuntoAtencion.');
        resolve(results);
      }
    });
  });
}

module.exports = { insertServicePoint };
