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

// Function to insert incidencia into visits
function insertVisita(visitas, incidentes) {
  return incidentes.map((incidente) => {
    const matchingVisita = visitas.find(
      (visita) => incidente.id_incidencia === Number(visita.id_incidencia),
    );
    let { descripcion_sol } = incidente;
    return {
      ...incidente,
      descripcion_sol: matchingVisita
        ? matchingVisita.atencion?.descripcion
        : descripcion_sol,
      visita: matchingVisita || null,
    };
  });
}

async function getIncidente(_, { id }) {
  let incidente = await fetch(`${process.env.API_INCID}/${id}`).then((res) =>
    res.json(),
  );
  let visitas = await visitaServ.getAllVisitas();
  visitas = visitas.map((visita) => {
    const { id_atencion, cl_nombre, cl_dni, descripcion, img_antes, img_desp } =
      visita;
    if (id_atencion) {
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
    }
    return visita;
  });
  incidente = insertVisita(visitas, [incidente]);
  return incidente[0];
}

async function getIncidentes() {
  let visitas = await visitaServ.getAllVisitas();
  visitas = visitas.map((visita) => {
    const { id_atencion, cl_nombre, cl_dni, descripcion, img_antes, img_desp } =
      visita;

    if (id_atencion) {
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
    }
    return visita;
  });
  let incidentes = await fetch(`${process.env.API_INCID}/`).then((res) =>
    res.json(),
  );
  incidentes = insertVisita(visitas, incidentes);
  return incidentes;
}

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    visita: getVisita,
    visitas: getVisitas,
    incidente: getIncidente,
    incidentes: getIncidentes,
  },
  Mutation: {
    createVisita: newVisita,
    updateVisita: updateVisita,
    delVisita: delVisitaById,
  },
};

export default resolvers;
