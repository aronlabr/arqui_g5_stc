import { Router } from 'express';
import visitaController from '../controlador/visita.controller.js';

const router = Router();

router.get('/all', visitaController.getAllNotif);

router.get('/:id', visitaController.getAllByID);

router.get('/:id/today', visitaController.getAllToday);

router.get('/:id/last', visitaController.getLastNotif);

router.post('/new', visitaController.createNotif);

router.put('/update', visitaController.createNotif);

// router.post('/suscribe', visitaController.createNotif);

// router.get('/:id', visitaController.getVisitaById);

// router.post('/new', visitaController.createVisita);

// router.get('/cuadrilla/:id', visitaController.getAllVisitasByCuadrilla);

// router.put('/:id', visitaController.updateVisita);

// router.post('/:id', visitaController.registerAtencion);

router.get('/ping', visitaController.getConnection);

router.delete('/products/:id', visitaController.deletePage);

export { router };
