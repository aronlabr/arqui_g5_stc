const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcryptjs = require('bcryptjs');

const queries = require('../../infraestructura/consultas/queries.js');
const { query } = require('../../infraestructura/conexion/db.js');
const conexion = require('../../infraestructura/conexion/db');

const createNewUser = async (userData) => {
  const result = await query(queries.newUser, Object.values(userData));
  if (!result) throw new Error('User no created or already exists');
  return result;
};

const getUserbyUser = async (user) => {
  try {
    const [result] = await query(queries.getUserbyUserQ, [user]);
    return result;
  } catch (error) {
    throw new Error('No user found');
  }
};

const loginUser = async ({ user, pass }) => {
  const data = await getUserbyUser(user);

  const isAuth = await bcryptjs.compare(pass, data.pass);

  if (!isAuth) throw new Erro('Password incorrect');

  const token = jwt.sign({ id_usuario: data.id_usuario }, 'grupoCinco');
  const cookiesOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  console.log('TOKEN: ' + token + ' para el usuario: ' + user);
  return [token, cookiesOptions];
};

const isSesionLive = async ({ user, ckjwt }) => {
  const data = await getUserbyUser(user);
  const decodificada = await promisify(jwt.verify)(ckjwt, 'grupoCinco');
  console.log(decodificada);
  if (!decodificada) throw new Erro('Verification fail');
  return true;
};

module.exports = {
  getUserbyUser,
  loginUser,
  createNewUser,
  isSesionLive,
};
