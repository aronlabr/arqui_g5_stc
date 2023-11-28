const Technician = require('../../domain/entities/Technician');

const getAll = async () => {
  return await Technician.findAll() ;
}

const create = async (data) => {
  return await Technician.create(data);
}

const update = async (id, data) => {
  const technician = await Technician.findByPk(id);
  technician.update(data);
  return technician;
}

const getById = async (id) => {
  return await Technician.findByPk(id);
}


module.exports = {
  getAll,
  create,
  update,
  getById
}
