import { createPool } from 'mysql2/promise';
import { HOST, USER, PASS, DBPORT, DBNAME } from '../../aplicacion/config.js';

export const pool = createPool({
  host: HOST,
  user: USER,
  password: PASS,
  port: DBPORT,
  database: DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = async (sql, params) => {
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
