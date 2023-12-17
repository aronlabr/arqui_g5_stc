export const swaggerUiOpts = {
  routePrefix: '/docs',
  exposeRoute: true,
};

export const swaggerOpts = {
  swagger: {
    info: {
      title: 'Visitas API',
      description: 'Visitas API documentation',
      version: '1.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: '127.0.0.1:4001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};
