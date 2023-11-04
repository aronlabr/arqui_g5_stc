import { query } from '../../infraestructura/conexion/db.js';
import consultas from '../../infraestructura/consultas/queries.js';
// Admin

const getAllVisitas = async () => {
  const result = await query(consultas.getAllVisitas);
  return result;
};

function removeEmpty(obj) {
  for (let prop in obj) {
    if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '')
      delete obj[prop];
  }
  return obj;
}

const getVisitaById = async (idVisita) => {
  let [result] = await query(consultas.getVisitaById, [idVisita]);
  result = removeEmpty(result);
  if (!result) throw new Error(`Visita #${idVisita} not found`);
  return result;
};

const createVisita = async ({ incidencia, cuadrilla, fecha }) => {
  cuadrilla = parseInt(cuadrilla);
  let info = await query(consultas.createVisita, [
    incidencia,
    cuadrilla,
    fecha,
  ]);
  const result = getVisitaById(info.insertId);
  return result;
};

// Tecnico

const getAllVisitasByCuadrilla = async (idCuadrilla) => {
  const result = await query(consultas.getAllVisitasByCuadrilla, [idCuadrilla]);
  return result;
};

const updateVisitaNVoNA = async ({ id, estado, motivo, imagen, lat, lon }) => {
  const info = await query(consultas.updateVisitaNVoNA, [
    estado,
    motivo,
    imagen,
    lat,
    lon,
    id,
  ]);
  console.log(info);
  return info.insertId;
};

const updateVisitaAtencionTr = async ({ id, estado, lat, lon }) => {
  const { insertId } = await query(consultas.updatePorAtender.initAtencion);
  await query(consultas.updatePorAtender.updateVisita, [
    insertId,
    lat,
    lon,
    id,
  ]);
  return id;
};

const updateAtencion = async ({
  id,
  id_atencion,
  nombre,
  dni,
  descrip,
  imgAnt,
  imgDes,
}) => {
  const info = await query(consultas.updateAtencion, [
    dni,
    nombre,
    descrip,
    imgAnt,
    imgDes,
    id_atencion,
  ]);
  const result = getVisitaById(id);
  return result;
};

const deleteVisitaById = async (idVisita) => {
  const visita = await getVisitaById(idVisita);
  if (visita) await query(consultas.deleteVisita, [idVisita]);
  return visita;
};

const deleteAtencionById = async (idAtencion) => {
  await query(consultas.deleteVisita, [idAtencion]);
};

async function subscribeEvent(message) {
  message = JSON.parse(message);
  const { event, data } = message;
  const eventHandler = {
    ERROR_NEW_VISITA: () => deleteVisitaById(data.id),
    ERROR_UPDATE_VISITA: () =>
      updateVisitaNVoNA({
        ...{ id: data.id, estado: '', imagen: '', lat: null, lon: null },
      }),
    ERROR_CHECK_VISITA: async () => {
      await updateVisitaAtencionTr({
        ...{ id: data.id, estado: '', lat: null, lon: null },
      });
      await deleteAtencionById(data.id_atencion);
    },
  };
  try {
    const result = await eventHandler[event]();
    console.log(`Found an ${event}, undoing operation`);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getAllVisitas,
  getVisitaById,
  createVisita,
  getAllVisitasByCuadrilla,
  updateVisitaNVoNA,
  updateVisitaAtencionTr,
  updateAtencion,
  deleteVisitaById,
  subscribeEvent,
};
