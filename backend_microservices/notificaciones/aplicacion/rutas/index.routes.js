import { Router } from 'express';
import notifController from '../controlador/notif.controller.js';

const router = Router();

router.get('/all', notifController.getAllNotif);

router.get('/:id', notifController.getAllByID);

router.get('/:id/today', notifController.getAllToday);

router.get('/:id/last', notifController.getLastNotif);

router.post('/new', notifController.createNotif);

router.put('/update', notifController.readedNotif);

// router.post('/suscribe', notifController.suscribeNotif);

export { router };
