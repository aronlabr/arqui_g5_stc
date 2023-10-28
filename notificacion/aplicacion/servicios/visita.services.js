import { query } from '../../infraestructura/conexion/db.js';
import consultas from '../../infraestructura/consultas/queries.js';
// Admin

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
    CHECK_VISITA: 'Se complejo una visita con exito',
  };

  const notif = {
    emisor,
    destino,
    evento,
    mensaje: pos_mensajes[evento],
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

const getNumberquery = async () => {
  const [result] = await query(consultas.prueba);
  return result;
};

const getNumber = () => {
  return 2;
};

async function subscribeEvent(message) {
  try {
    message = JSON.parse(message);
    const { event, data } = message;
    const pos_notif = {
      NEW_VISITA: {
        emisor: 0,
        destino: data.id_cuadrilla,
      },
      UPDATE_VISITA: {
        emisor: data.id_cuadrilla,
        destino: 0,
      },
      CHECK_VISITA: {
        emisor: data.id_cuadrilla,
        destino: 0,
      },
    };

    createNotif({ ...pos_notif[event], evento: event });

    switch (event) {
      case 'NEW_VISITA':
        console.log('Notification de Visita Agendada');
        break;
      case 'UPDATE_VISITA':
        console.log('Notificacion de Visita actualizada');
        break;
      case 'CHECK_VISITA':
        console.log('Notificacion de Visita realizada');
        break;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getAllNotif,
  getAllByUserId,
  createNotif,
  subscribeEvent,
};
