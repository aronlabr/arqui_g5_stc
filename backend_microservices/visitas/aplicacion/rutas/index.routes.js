import visitaCtr from '../controlador/visita.controller.js';

const resVisitaSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    id_cuadrilla: { type: 'integer' },
    id_incidencia: { type: 'string' },
    fecha: { type: 'string' },
    estado: { type: 'string' },
    motivo: { type: 'string' },
    imagen: { type: 'string' },
    lat: { type: 'number' },
    lon: { type: 'number' },
  },
};

const paramsVisitaSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
  },
};

const visitaSchema = {
  params: paramsVisitaSchema,
  response: { '2xx': resVisitaSchema },
};

export default [
  {
    method: 'GET',
    url: '/',
    handler: async (req, rep) => {
      return { hello: 'world' };
    },
  },
  {
    method: 'GET',
    url: '/all',
    schema: {
      response: {
        '2xx': {
          type: 'array',
          items: resVisitaSchema,
        },
      },
    },
    handler: visitaCtr.getAllVisitas,
  },
  {
    method: 'POST',
    url: '/new',
    handler: visitaCtr.createVisita,
  },
  {
    method: 'GET',
    url: '/cuadrilla/:id',
    handler: visitaCtr.getAllVisitasByCuadrilla,
  },
  {
    method: 'GET',
    url: '/:id',
    schema: visitaSchema,
    handler: visitaCtr.getVisitaById,
  },
  {
    method: 'POST',
    url: '/:id',
    schema: visitaSchema,
    handler: visitaCtr.registerAtencion,
  },
  {
    method: 'PUT',
    url: '/:id',
    schema: visitaSchema,
    handler: visitaCtr.updateVisita,
  },
  {
    method: 'DELETE',
    url: '/:id',
    schema: visitaSchema,
    handler: visitaCtr.deleteVisitaById,
  },
];
