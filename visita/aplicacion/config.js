import { config } from 'dotenv';

if (process.env.NODE_ENV === 'prod') {
  config();
} else if (process.env.NODE_ENV === 'dock') {
  config({ path: 'dock.env' });
} else {
  config({ path: '.env.local' });
}

export const SERVICE = process.env.SERVICE;
export const PORT = process.env.PORT;
export const HOST = process.env.HOST || 'localhost';
export const USER = process.env.USER || 'root';
export const PASS = process.env.PASS || 'root';
export const DBPORT = process.env.DBPORT || 3306;
export const DBNAME = process.env.DBNAME || 'db';
export const API_URL = process.env.API_URL || 'http://localhost:3000';
export const MESSAGE_BROKER_URL = process.env.MESSAGE_BROKER_URL;
export const EXCHANGE_NAME = 'BROKER';
export const VISITA_BINDING_KEY = 'VISITA_SERVICE';
export const NOTIF_BINDING_KEY = 'NOTIF_SERVICE';
export const QUEUE_NAME = 'VISIT_QUEUE';
