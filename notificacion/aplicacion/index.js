import express from 'express';
import { router } from './rutas/index.routes.js';
import { PORT } from './config.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/', router);

const server = app.listen(PORT, () =>
  console.log(
    `🤖 Server iniciado en: http://localhost:${server.address().port}`,
  ),
);
