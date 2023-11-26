const express = require('express');
const incidentController = require('../controlador/incidentController');

const router = express.Router();

// Define una ruta raíz
router.get('/', incidentController.getAllIncidents);
router.get('/:incidentId', incidentController.getIncidentsByIncidentID); //Obtener un incidente por ID de incidencia
router.get('/client/:clientId', incidentController.getIncidentsByClientId); //Obtener un incidente por ID del cliente
router.get('/puntoatencion/:puntoAtencionId', incidentController.getIncidentsByPuntoAtencionID); //Obtener incidente por ID del punto de atención
router.get('/solved', incidentController.getSolvedIndcidents); //Obtener incidentes resueltos
router.get('/notsolved', incidentController.getNotSolvedIncidents); //Obtener incidentes no resueltos
router.get('/date/:creationDate', incidentController.getIncidentsByCreationDate); //obtener incidente por día de creación
router.post('/createincident', incidentController.createIncident); //crear incidentes
router.put('/solution/:incidentId', incidentController.updateIncidentSolution); //Actualizar incidente con la solución
router.put('/updatetosolved/:incidentId', incidentController.updateIncidentStateSolved);// Ruta para actualizar el estado de una incidencia a "resuelta"


module.exports = router;
