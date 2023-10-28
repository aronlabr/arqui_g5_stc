import visitaServices from '../servicios/visita.services.js';
import { VISITA_BINDING_KEY, NOTIF_BINDING_KEY } from '../config.js';
import {
  createChannel,
  publishMessage,
} from '../../infraestructura/adaptador/broker.js';

let channel;
try {
  channel = await createChannel();
} catch (error) {
  console.error('Error setting up message broker:' + error.message);
}

// Custom error handler
const errorWrapper = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Send an error response with the appropriate status code and a custom error message
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
};

// Admin

const getAllVisitas = async (req, res) => {
  try {
    const result = await visitaServices.getAllVisitas();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const getVisitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await visitaServices.getVisitaById(id);
    const message = { event: 'CHECK_VISITA', data: { ...result } };
    await publishMessage({
      channel,
      binding_key: NOTIF_BINDING_KEY,
      message: JSON.stringify(message),
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const createVisita = async (req, res) => {
  try {
    const { incidencia, cuadrilla, fecha } = req.body;
    const result = await visitaServices.createVisita({
      incidencia,
      cuadrilla,
      fecha,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(301).json('Error de peticion');
  }
};

// Tecnico

const getAllVisitasByCuadrilla = async (req, res) => {
  try {
    const cuadrilla = req.params.id;
    const result = await visitaServices.getAllVisitasByCuadrilla(cuadrilla);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const updateVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    let result;
    const visita = await visitaServices.getVisitaById(id);
    if (visita.estado) throw new Error('State already register');
    if (estado === 'nv' || estado === 'vna') {
      const { motivo, imagen, lat, lon } = req.body;
      result = await visitaServices.updateVisitaNVoNA({
        ...{ id, estado, motivo, imagen, lat, lon },
      });
    } else if (estado === 'va') {
      const { lat, lon } = req.body;
      result = await visitaServices.updateVisitaAtencionTr({
        ...{ id, estado, lat, lon },
      });
    } else throw new Error("Incorrect state. Expected 'nv' or 'vna' or 'va'");

    publishMessage(channel, VISITA_BINDING_KEY, result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const registerAtencion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_atencion } = await visitaServices.getVisitaById(id);

    if (!id_atencion) throw new Error('Id Atencion incorrecto');

    let { nombre, dni, descrip, imgAnt, imgDes } = req.body;
    const result = await visitaServices.updateAtencion({
      ...{ id, id_atencion, nombre, dni, descrip, imgAnt, imgDes },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// prueba
const getConnection = async (req, res, next) => {
  try {
    res.json('Hello World');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const postPage = (req, res) => {
  res.send('POST request to the homepage');
};

const putPage = (req, res) => {
  const { id, name, description } = req.body;
  res.send(`Name ${id} ${name}, desc ${description}`);
};

const deletePage = (req, res) => {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
};

export default {
  errorWrapper,
  getAllVisitas,
  getVisitaById,
  createVisita,
  updateVisita,
  registerAtencion,
  getAllVisitasByCuadrilla,
  getConnection,
  deletePage,
};
