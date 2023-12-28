import { PORT, NODE_ENV } from './config.js';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import Routes from './rutas/index.routes.js';
import graphServer from './graphql/server.js';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import fastifyPrintRoutes from 'fastify-print-routes';
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

if (NODE_ENV === 'development') {
  swaggerOpts.host = `localhost:${PORT}`;
  await app.register(Swagger, swaggerOpts);
  await app.register(SwaggerUI, swaggerUiOpts);
  await app.register(fastifyPrintRoutes, { compact: true });
}

try {
  await graphServer(app);
} catch (err) {
  app.log.error(err);
}

await app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

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
// app.use(cors());
// app.use(express.json({ limit: '20mb' }));
// app.use(express.urlencoded({ extended: true, limit: '20mb' }));
