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
  return result;
};

const createVisita = async ({ incidencia, cuadrilla, fecha }) => {
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
  const result = getVisitaById(info.insertId);
  return result;
};

const updateVisitaAtencionTr = async ({ id, estado, lat, lon }) => {
  const { insertId } = await query(consultas.updatePorAtender.initAtencion);
  await query(consultas.updatePorAtender.updateVisita, [
    insertId,
    lat,
    lon,
    id,
  ]);
  const result = getVisitaById(id);
  return result;
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

const getNumberquery = async () => {
  const [result] = await query(consultas.prueba);
  return result;
};

const getNumber = () => {
  return 2;
};

export default {
  getNumberquery,
  getNumber,
  getAllVisitas,
  getVisitaById,
  createVisita,
  getAllVisitasByCuadrilla,
  updateVisitaNVoNA,
  updateVisitaAtencionTr,
  updateAtencion,
};
