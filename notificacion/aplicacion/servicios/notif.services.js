import { query } from '../../infraestructura/conexion/db.js';
import consultas from '../../infraestructura/consultas/queries.js';
import { VISITA_BINDING_KEY } from '../config.js';
import {
  publishMessage,
  createChannel,
} from '../../infraestructura/adaptador/broker.js';
// Admin

let channel;
try {
  channel = await createChannel();
} catch (error) {
  console.error('Error setting up message broker:', error.message);
}

const getAllNotif = async () => {
  const result = await query(consultas.getAllNotif);
  return result;
};

const getAllByUserId = async (idUser) => {
  let [result] = await query(consultas.getAllByID, [idUser]);
  return result;
};

const createNotif = async ({ emisor, destino, evento }) => {
  const pos_mensajes = {
    NEW_VISITA: 'Se creo una nueva visita',
    UPDATE_VISITA: 'Hubo cambios en el estado de esta visita',
    CHECK_VISITA: 'Se completo una visita con exito',
  };

  const info = await query(consultas.createNotif, [
    emisor,
    destino,
    evento,
    pos_mensajes[evento],
  ]);
  /** info
   {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 52,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
    }
  */

  return info;
};

const updateReadNotif = async (idNotif) => {
  await query(consultas.readeNotif, [idNotif]);
  return 'Notificacion marcada como leida';
};

async function subscribeEvent(message) {
  message = JSON.parse(message);
  const { event, data } = message;
  const participants = {
    ch_1: { emisor: 0, destino: data.id_cuadrilla },
    ch_2: { emisor: data.id_cuadrilla, destino: 0 },
  };
  let result;

  const eventHandler = {
    NEW_VISITA: {
      ...{ participant: participants.ch_1, evento: event, cl: 'Agendada' },
    },
    UPDATE_VISITA: {
      ...{ participant: participants.ch_2, evento: event, cl: 'actualizada' },
    },
    CHECK_VISITA: {
      ...{ participant: participants.ch_2, evento: event, cl: 'realizada' },
    },
  };

  try {
    result = await createNotif({
      ...eventHandler[event].participant,
      evento: event,
    });
    console.log('Notification de Visita ' + eventHandler[event].cl);
  } catch (error) {
    console.error(error.message);
    const message = { event: `ERROR_${event}`, data };
    console.log(message);
    await publishMessage({
      channel,
      binding_key: VISITA_BINDING_KEY,
      message: JSON.stringify(message),
    });
  }
}

// await subscribeEvent(
//   JSON.stringify({ event: 'CHECK_VISITA', data: { id_cuadrilla: '5' } }),
// );

export default {
  getAllNotif,
  getAllByUserId,
  createNotif,
  subscribeEvent,
};
