// controllers/incidentController.js
const incidentService = require('../servicios/incidentServices.js');

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getAllIncidents();
    return res.status(200).json(incidents);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controlador para obtener incidencias por id
const getIncidentsByIncidentID = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const [incidents] = await incidentService.getIncidentsByIncidentId(
      incidentId,
    );
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la incidencia' });
  }
};

// Controlador para obtener incidencias por cliente
const getIncidentsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;
    const incidents = await incidentService.getIncidentsByClientId(clientId);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener incidencias por cliente' });
  }
};

// Controlador para obtener incidencias por punto de atención
const getIncidentsByPuntoAtencionID = async (req, res) => {
  try {
    const { puntoAtencionId } = req.params;
    const incidents = await incidentService.getIncidentsByPuntoAtencionID(
      puntoAtencionId,
    );
    res.status(200).json(incidents);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener incidencias por punto de atención' });
  }
};

// Controlador para obtener incidencias resueltas
const getSolvedIndcidents = async (req, res) => {
  try {
    const incidents = await incidentService.getSolvedIndcidents();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener incidencias resueltas' });
  }
};

// Controlador para obtener incidencias no resueltas
const getNotSolvedIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getNotSolvedIncidents();
    res.status(200).json(incidents);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener incidencias no resueltas' });
  }
};

// Controlador para obtener incidencias por fecha de creación
const getIncidentsByCreationDate = async (req, res) => {
  try {
    const { creationDate } = req.params;
    const incidents = await incidentService.getIncidentsByCreationDate(
      creationDate,
    );
    res.status(200).json(incidents);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener incidencias por fecha de creación' });
  }
};

const getClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const client = await incidentService.getClient(clientId);
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const result = await incidentService.createClient(clientData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear un nuevo cliente',
      message: error.message,
    });
  }
};

// Controlador para crear una nueva incidencia
const createIncident = async (req, res) => {
  try {
    const incidentData = req.body;
    const getClient = await incidentService.getClient(incidentData.id_cliente);
    if (!getClient) throw new Error('El cliente no existe');
    const createPuntoAtencion = await incidentService.createPuntoAtencion(
      incidentData,
    );
    incidentData.id_puntoatencion = createPuntoAtencion.insertId;
    const result = await incidentService.createIncident(incidentData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear una nueva incidencia',
      message: error.message,
    });
  }
};

// Controlador para actualizar la descripción de la solución de una incidencia
const updateIncidentSolution = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { solution } = req.body;
    const result = await incidentService.updateIncidentSolution(
      incidentId,
      solution,
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al actualizar la descripción de la solución' });
  }
};

const updateIncidentStateSolved = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const result = await incidentService.updateIncidentStateSolved(incidentId);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al actualizar el estado de la incidencia' });
  }
};

module.exports = {
  getAllIncidents,
  getIncidentsByIncidentID,
  getIncidentsByClientId,
  getIncidentsByPuntoAtencionID,
  getSolvedIndcidents,
  getNotSolvedIncidents,
  getIncidentsByCreationDate,
  getClient,
  createClient,
  createIncident,
  updateIncidentSolution,
  updateIncidentStateSolved,
};
