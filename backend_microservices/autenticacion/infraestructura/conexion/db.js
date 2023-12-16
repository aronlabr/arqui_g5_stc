const { createPool } = require('mysql2/promise');
const { HOST, USER, PASS, DBPORT, DBNAME } = require('../../config.js');

const pool = createPool({
  host: HOST,
  user: USER,
  password: PASS,
  port: DBPORT,
  database: DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

exports.query = async (sql, params) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  } finally {
    if (connection) connection.release();
  }
};
