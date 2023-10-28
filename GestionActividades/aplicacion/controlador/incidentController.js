// controllers/incidentController.js
import incidentService from '../services/incidentServices.js';

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getAllIncidents();
    return res.status(200).json(incidents);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const createIncident = async (req, res) => {
  const { id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob } = req.body;

  try {
    const result = await incidentService.createIncident({ id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Controlador para obtener incidencias por cliente
const getIncidentsByClientId = async (req, res) => {
    try {
      const { clientId } = req.params; // Supongamos que el cliente se pasa como un parámetro en la URL
      const incidents = await incidentService.getIncidentsByClientId(clientId);
      res.status(200).json(incidents);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener incidencias por cliente' });
    }
}

// Controlador para obtener incidencias por punto de atención
const getIncidentsByPuntoAtencionID = async (req, res) => {
    try {
      const { puntoAtencionId } = req.params; // Supongamos que el punto de atención se pasa como un parámetro en la URL
      const incidents = await incidentService.getIncidentsByPuntoAtencionID(puntoAtencionId);
      res.status(200).json(incidents);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener incidencias por punto de atención' });
    }
};





// Otros controladores según tus necesidades
