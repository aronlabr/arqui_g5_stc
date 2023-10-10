import { Router } from 'express';
import testController from '../controlador/test.controller.js';

const router = Router();

router.get('/', testController.getHW);

router.get('/ping', testController.getConnection);

router.post('/', testController.postPage);

router.put('/products', testController.putPage);

router.delete('/products/:id', testController.deletePage);

export { router };
