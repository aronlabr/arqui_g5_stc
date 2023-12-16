const mysql = require('mysql2');

const dbConfig = {
  host: process.env.HOST || 'db4free.net',
  user: process.env.USER || 'g5gestact',
  password: process.env.PASS || 'g5gestact', // Agrega aquí la contraseña si es necesaria
  database: process.env.DBNAME || 'g5_gestact',
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

module.exports = connection;
