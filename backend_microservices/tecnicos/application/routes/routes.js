const router = require('express').Router();
const TechnicianController = require('../controllers/TechnicianController.js');

router.get('/', async (req, res) => {
  res.json({
    message: 'Welcome to the Technician Microservice API',
  });
});

router.get('/technicians', TechnicianController.getAll);
router.post('/technicians', TechnicianController.create);
router.put('/technicians/:id', TechnicianController.update);
router.get('/technicians/:id', TechnicianController.getById);
router.delete('/technicians/:id', TechnicianController.deleteById);

module.exports = router;
