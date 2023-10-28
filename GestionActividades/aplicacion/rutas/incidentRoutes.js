import express from 'express';
import incidentController from '../controllers/incidentController';

const router = express.Router();

router.get('/incidents/client/:clientId', incidentController.getIncidentsByClientId);
router.get('/incidents/puntoatencion/:puntoAtencionId', incidentController.getIncidentsByPuntoAtencionID);
router.get('/incidents/solved', incidentController.getSolvedIndcidents);
router.get('/incidents/notsolved', incidentController.getNotSolvedIncidents);
router.get('/incidents/date/:creationDate', incidentController.getIncidentsByCreationDate);
router.post('/incidents', incidentController.createIncident);
router.put('/incidents/solution/:incidentId', incidentController.updateIncidentSolution);

export default router;
