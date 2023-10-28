const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'g5_db',
});

conexion.connect((error) => {
  if (error) {
    console.log('El error de conexión es: ' + error);
    return;
  }
  console.log('Conexión con base de datos exitosa');
});

module.exports = conexion;
