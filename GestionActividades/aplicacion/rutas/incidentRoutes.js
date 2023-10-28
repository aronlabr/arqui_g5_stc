const express = require('express');
const incidentController = require('../controlador/incidentController');

const router = express.Router();

// Define una ruta raíz
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido a la API de incidentes' });
});

router.get('/client/:clientId', incidentController.getIncidentsByClientId);
router.get('/puntoatencion/:puntoAtencionId', incidentController.getIncidentsByPuntoAtencionID);
router.get('/solved', incidentController.getSolvedIndcidents);
router.get('/notsolved', incidentController.getNotSolvedIncidents);
router.get('/date/:creationDate', incidentController.getIncidentsByCreationDate);
router.post('/createincident', incidentController.createIncident);
router.put('/solution/:incidentId', incidentController.updateIncidentSolution);


module.exports = router;
