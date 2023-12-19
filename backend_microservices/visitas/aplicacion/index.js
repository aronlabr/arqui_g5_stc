// import express from 'express';
// import { router } from './rutas/index.routes.js';
// import { PORT } from './config.js';
// import morgan from 'morgan';
import graphServer from './graphql/server.js';
// import cors from 'cors';
import Fastify from 'fastify';
import fastifyPrintRoutes from 'fastify-print-routes';
import { PORT, NODE_ENV } from './config.js';
import Routes from './rutas/index.routes.js';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import { swaggerOpts, swaggerUiOpts } from './utils/swagger.js';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
    },
  },
  production: true,
  test: false,
};

const app = Fastify({
  logger: envToLogger[NODE_ENV] || true,
  bodyLimit: 1048576 * 8,
});

await app.register(Swagger, swaggerOpts);
await app.register(SwaggerUI, swaggerUiOpts);
await app.register(fastifyPrintRoutes, { compact: true });
// app.use(cors());
// app.use(express.json({ limit: '20mb' }));
// app.use(express.urlencoded({ extended: true, limit: '20mb' }));

try {
  await graphServer(app);
} catch (err) {
  app.log.error(err);
}

// app.use(morgan('dev'));
// app.use('/', router);

// const server = app.listen(PORT, () =>
//   console.log(
//     `🤖 Server iniciado en: http://localhost:${server.address().port}`,
//   ),
// );

// app.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

Routes.forEach((route) => {
  app.route(route);
});

app.setNotFoundHandler((req, rep) => {
  rep.status(404).send({
    statusCode: 404,
    error: 'Not Found',
    message: `La ruta ${req.url} no existe`,
  });
});

const start = () => {
  try {
    app.listen({ port: PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

if (NODE_ENV === 'production') {
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      app.log.info(`Closing server`);
      await app.close();
      process.exit(0);
    });
  });
}
start();
