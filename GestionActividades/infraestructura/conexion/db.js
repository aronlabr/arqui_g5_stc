const mysql = require('mysql2');

const dbConfig = {
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9656632',
    password: '487UEGFZUV', // Agrega aquí la contraseña si es necesaria
    database: 'sql9656632'
  };
  
  // Establece la conexión a la base de datos
  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return;
    }
    console.log('Conexión a la base de datos MySQL establecida.');
    // Puedes comenzar a realizar consultas aquí
  });
  
  // Realiza tus consultas y operaciones en la base de datos
  
  // No olvides cerrar la conexión cuando hayas terminado de usarla
  connection.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
    }
    console.log('Conexión a la base de datos MySQL cerrada.');
  });

  module.exports = conex