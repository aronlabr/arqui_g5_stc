import notifServices from '../servicios/notif.services.js';
import {
  createChannel,
  subscribeMessage,
} from '../../infraestructura/adaptador/broker.js';

try {
  const channel = await createChannel();
  await subscribeMessage({ channel, service: notifServices });
} catch (error) {
  console.error('Error setting up message broker:', error.message);
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

const getAllNotif = async (req, res) => {
  try {
    const result = await notifServices.getAllNotif();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllByID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await notifServices.getAllByUserId(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllToday = async (req, res) => {
  try {
    res.json('Hola');
  } catch (error) {
    console.error(error);
    res.status(301).json('Error de peticion');
  }
};

const getLastNotif = async (req, res) => {
  try {
    const cuadrilla = req.params.id;

    res.json('Hola ' + cuadrilla);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createNotif = async (req, res) => {
  try {
    const { emisor, destino, evento } = req.body;
    const result = await notifServices.createNotif({
      emisor,
      destino,
      evento,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

/** notif
   *{
      "event": "NEW_notif",
      "data": {
        "id": 86,
        "id_incidencia": "64",
        "id_cuadrilla": 3,
        "fecha": "2023-11-20T10:00:33.000Z"
      }
    }
   */
const suscribeNotif = async (req, res) => {
  try {
    const { event, data } = req.body;
    const result = await notifServices.subscribeEvent(
      JSON.stringify({
        event,
        data,
      }),
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const readedNotif = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json(id);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

export default {
  errorWrapper,
  getAllNotif,
  getAllByID,
  getAllToday,
  getLastNotif,
  createNotif,
  suscribeNotif,
  readedNotif,
};
