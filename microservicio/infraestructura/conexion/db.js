import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config({ path: '.env.local' });

export const pool = createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.USER || 'root',
  password: process.env.PASS || 'root',
  port: process.env.DBPORT || 3306,
  database: process.env.DBNAME || 'db',
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
