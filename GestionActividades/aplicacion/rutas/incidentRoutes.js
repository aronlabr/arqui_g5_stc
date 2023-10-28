// routes/incidentRoutes.js
import express from 'express';
import incidentController from '../controllers/incidentController.js';

const router = express.Router();

router.get('/incidents', incidentController.getAllIncidents);
router.post('/incidents', incidentController.createIncident);
// Agrega otras rutas según tus necesidades

export default router;
