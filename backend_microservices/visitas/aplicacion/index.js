import express from 'express';
import { router } from './rutas/index.routes.js';
import { PORT } from './config.js';
import morgan from 'morgan';
import graphServer from './graphql/server.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

try {
  const graph = await graphServer(app);
  console.log('GraphQL launch in /graphql');
} catch (error) {
  console.error(error);
}

app.use(morgan('dev'));
app.use('/', router);

const server = app.listen(PORT, () =>
  console.log(
    `🤖 Server iniciado en: http://localhost:${server.address().port}`,
  ),
);
