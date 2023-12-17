export const {
  NODE_ENV = 'production',
  SERVICE = 'visitas',
  PORT = 3000,
  API_INCID = 'http://localhost:3000',
} = process.env;

export const {
  HOST: DB_HOST = 'localhost',
  USER: DB_USER = 'root',
  PASS: DB_PASS = 'root',
  DBPORT: DB_PORT = 3306,
  DBNAME: DB_NAME = 'db',
} = process.env;

export const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME = 'BROKER',
  VISITA_BINDING_KEY = 'VISITA_SERVICE',
  NOTIF_BINDING_KEY = 'NOTIF_SERVICE',
  QUEUE_NAME = 'VISIT_QUEUE',
} = process.env;
