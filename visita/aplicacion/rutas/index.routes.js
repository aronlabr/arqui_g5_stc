import { Router } from 'express';
import testController from '../controlador/test.controller.js';

const router = Router();

router.use(testController.errorWrapper);

router.get('/', testController.getAllVisitas);

router.get('/:id', testController.getVisitaById);

router.post('/new', testController.createVisita);

router.get('/cuadrilla/:id', testController.getAllVisitasByCuadrilla);

router.put('/:id', testController.updateVisita);

router.post('/:id', testController.registerAtencion);

router.get('/ping', testController.getConnection);

router.delete('/products/:id', testController.deletePage);

export { router };
