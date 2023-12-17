import visitaServices from '../servicios/visita.services.js';
import { VISITA_BINDING_KEY, NOTIF_BINDING_KEY, API_INCID } from '../config.js';
import {
  createChannel,
  publishMessage,
  subscribeMessage,
} from '../../infraestructura/adaptador/broker.js';

let channel;
try {
  channel = await createChannel();
  await subscribeMessage({
    channel,
    service: visitaServices,
    binding_key: VISITA_BINDING_KEY,
  });
} catch (error) {
  console.error('Error setting up message broker:' + error.message);
}

// Admin

// Function to insert incidencia into visits
function insertIncidencia(visitas, incidencias) {
  return visitas.map((visita) => {
    const matchingIncidencia = incidencias?.find(
      (incidencia) =>
        incidencia?.id_incidencia === Number(visita.id_incidencia),
    );
    return {
      ...visita,
      incidencia: matchingIncidencia || null,
    };
  });
}

const getAllVisitas = async (req, res) => {
  try {
    const visitas = await visitaServices.getAllVisitas();
    res.send(visitas);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const getVisitaById = async (req, res) => {
  try {
    const { id } = req.params;
    let visita = await visitaServices.getVisitaById(id);
    // const incidente = await fetch(API_INCID + '/' + visita.id_incidencia).then(
    //   (res) => res.json(),
    // );
    visita.incidencia = null;

    res.send(visita);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const createVisita = async (req, res) => {
  try {
    const { incidencia, cuadrilla, fecha } = req.body;
    const incidenciaData = await fetch(`${API_INCID}/${incidencia}`).then(
      (res) => {
        if (res.ok) return res.json();
        throw new Error(`Incidencia ${incidencia} not found`);
      },
    );

    const result = await visitaServices.createVisita({
      incidencia,
      cuadrilla,
      fecha,
    });

    const message = {
      event: 'NEW_VISITA',
      data: {
        ...result,
        id_cuadrilla: cuadrilla,
        error: false || req.body?.error,
      },
    };
    await publishMessage({
      channel,
      binding_key: NOTIF_BINDING_KEY,
      message: JSON.stringify(message),
    });
    if (res.prevent) return result;
    res.send(result);
  } catch (error) {
    console.error(error);
    if (res.prevent) throw new Error(error.message);
    res.status(500).json(error.message);
  }
};

// Tecnico

const getAllVisitasByCuadrilla = async (req, res) => {
  try {
    const cuadrilla = req.params.id;
    const visitas = await visitaServices.getAllVisitasByCuadrilla(cuadrilla);
    const incidentes = await fetch(API_INCID + '/')
      .then((res) => res.json())
      .catch((err) => {
        console.error(err.message);
      });
    const visitasWithIncidencia = insertIncidencia(visitas, incidentes);
    res.send(visitasWithIncidencia);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const updateVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    let visita = await visitaServices.getVisitaById(id);

    if (visita.estado) throw new Error('State already register');
    let info;
    if (estado === 'nv' || estado === 'vna') {
      const { motivo, imagen, lat, lon } = req.body;
      info = await visitaServices.updateVisitaNVoNA({
        ...{ id, estado, motivo, imagen, lat, lon },
      });
    } else if (estado === 'va') {
      const { lat, lon } = req.body;
      info = await visitaServices.updateVisitaAtencionTr({
        ...{ id, estado, lat, lon },
      });
    } else throw new Error("Incorrect state. Expected 'nv' or 'vna' or 'va'");

    visita = await visitaServices.getVisitaById(id);
    const message = { event: 'UPDATE_VISITA', data: { ...visita } };

    await publishMessage({
      channel,
      binding_key: NOTIF_BINDING_KEY,
      message: JSON.stringify(message),
    });

    if (res.prevent) return visita;
    res.status(200).send(visita);
  } catch (error) {
    console.error(error);
    if (res.prevent) throw new Error(error.message);
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

    const message = { event: 'CHECK_VISITA', data: { ...result } };
    await publishMessage({
      channel,
      binding_key: NOTIF_BINDING_KEY,
      message: JSON.stringify(message),
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const deleteVisitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const visita = await visitaServices.deleteVisitaById(id);
    res.send(visita);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

// prueba

export default {
  getAllVisitas,
  getVisitaById,
  getAllVisitasByCuadrilla,
  createVisita,
  updateVisita,
  registerAtencion,
  deleteVisitaById,
};
