const mysql = require('mysql2');

const dbConfig = {
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9656920',
    password: 'ZDmGk4QLCm', // Agrega aquí la contraseña si es necesaria
    database: 'sql9656920'
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
  

module.exports = connection