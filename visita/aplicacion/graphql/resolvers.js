import visitaCtr from '../controlador/visita.controller.js';
import visitaServ from '../servicios/visita.services.js';

async function getVisita(_, { id }) {
  const visita = await visitaServ.getVisitaById(id);
  let { id_atencion, cl_nombre, cl_dni, descripcion, img_antes, img_desp } =
    visita;
  if (id_atencion)
    return {
      ...visita,
      atencion: {
        id_atencion,
        cl_nombre,
        cl_dni,
        descripcion,
        img_antes,
        img_desp,
      },
    };
  return visita;
}

async function getVisitas() {
  let visitas = await visitaServ.getAllVisitas();
  return visitas;
}

async function newVisita(_, { incidencia, cuadrilla, fecha }, context) {
  let { req, res } = context;
  res.prevent = true;
  req.body = {
    ...req.body,
    incidencia,
    cuadrilla,
    fecha,
  };
  const visita = await visitaCtr.createVisita(req, res);
  console.log(visita);
  return visita;
}

async function updateVisita(_, { visita }, { req, res }) {
  res.prevent = true;
  req.params.id = visita.id;
  req.body = {
    ...req.body,
    ...visita,
  };
  const update = await visitaCtr.updateVisita(req, res);
  return update;
}

async function delVisitaById(_, { id }) {
  let visitas = await visitaServ.deleteVisitaById(id);
  return visitas;
}

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    visita: getVisita,
    visitas: getVisitas,
  },
  Mutation: {
    createVisita: newVisita,
    updateVisita: updateVisita,
    delVisita: delVisitaById,
  },
};

export default resolvers;
