const dotenv = require('dotenv');
const { config } = dotenv;

if (process.env.NODE_ENV === 'prod') {
  config();
} else {
  config({ path: '.env.local' });
}

const HOST = process.env.HOST || 'localhost';
const USER = process.env.USER || 'root';
const PASS = process.env.PASS || 'admin';
const DBPORT = process.env.DBPORT || 3306;
const DBNAME = process.env.DBNAME || 'g5_db';

module.exports = {
  HOST,
  USER,
  PASS,
  DBPORT,
  DBNAME,
};
