import express from 'express';
import { router } from './rutas/index.routes.js';
import { config } from 'dotenv';
import morgan from 'morgan';

config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 0;

app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/', router);

const server = app.listen(port, () =>
  console.log(
    `🤖 Server iniciado en: http://localhost:${server.address().port}`,
  ),
);
