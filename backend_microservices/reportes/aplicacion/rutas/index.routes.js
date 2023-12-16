import { Router } from 'express';
import reportsController from '../controlador/reportes.controller.js';

const router = Router();

router.get('/', reportsController.getData);

router.post('/save', testController.updatedata);

export { router };
