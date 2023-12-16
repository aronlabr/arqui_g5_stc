import { Router } from 'express';
import visitaController from '../controlador/visita.controller.js';

const router = Router();

router.use(visitaController.errorWrapper);

router.get('/', visitaController.getAllVisitas);

router.get('/:id', visitaController.getVisitaById);

router.post('/new', visitaController.createVisita);

router.get('/cuadrilla/:id', visitaController.getAllVisitasByCuadrilla);

router.put('/:id', visitaController.updateVisita);

router.post('/:id', visitaController.registerAtencion);

router.delete('/:id', visitaController.deleteVisitaById);

export { router };
