const TechnicianService = require('../services/TechnicianService.js');

const getAll = async (req, res) => {
  try {
    const technicians = await TechnicianService.getAll();
    res.json(technicians);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const create = async (req, res) => {
  try {
    const technician = await TechnicianService.create(req.body);
    res.json(technician);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    const technician = await TechnicianService.update(req.params.id, req.body);
    res.json(technician);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  create,
  update
}

