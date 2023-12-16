import express from 'express';
import { router } from './rutas/index.routes.js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 0;

app.use('/', router);

const server = app.listen(port, () =>
  console.log(
    `🤖 Server iniciado en: http://localhost:${server.address().port}`,
  ),
);
