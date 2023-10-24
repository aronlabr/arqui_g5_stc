const {DataTypes} = require('sequelize')
const {sequelize} = require('../../infrastructure/connection/db')

const Technician = sequelize.define('technician', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  available: {
    type: DataTypes.BOOLEAN,
  },
  groupNumber: {
    type: DataTypes.INTEGER
  }
})

module.exports = Technician
