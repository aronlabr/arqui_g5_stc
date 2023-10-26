const queries = require('../../infraestructura/consultas/queries.js')
const conexion = require('../../infraestructura/conexion/db')

const getUserbyUser = async (user) => {
    const result = conexion.query(queries.getUserbyUserQ, [user]);
    return result;
  }

module.exports = {
    getUserbyUser
}

