const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcryptjs = require('bcryptjs');

const queries = require('../../infraestructura/consultas/queries.js');
const { query } = require('../../infraestructura/conexion/db.js');
const conexion = require('../../infraestructura/conexion/db');

/*
{
    "user": "aldairam", 
    "pass": "123456",
    "name": "Aldair Asencio Medina",
    "dni": "71732780",
    "phone": "916829404", 
    "address": "Pasaje Ayar Manco 123", 
    "email": "aldair@gmail.com"
}

{
  "id": 4,
  "name": "Martinez Sasd",
  "email": "mar.sasd@mail.com",
  "phone": "977-559-213",
  "address": "Surquillo, 158 Norte",
  "available": true,
  "groupNumber": 0,
  "updatedAt": "2023-11-26T01:03:42.431Z",
  "createdAt": "2023-11-26T01:03:42.431Z"
}

{
  "name": "Martinez Sarosi",
  "email": "mar.saro@mail.com",
  "phone": "977-559-696",
  "address": "Surquillo, 158 Norte",
  "available": true,
  "groupNumber": 0
}
*/

const url = 'http://localhost/api/tecnicos/technicians';
//'INSERT INTO usuarios (id_usuario, user, pass, name, dni, phone, address, email)
const createNewUser = async (userData) => {
  const { user, pass } = userData;
  let newTecnico = fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...userData, available: true, groupNumber: 0 }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  const result = await query(queries.newUser, [
    newTecnico.id,
    user,
    pass,
    ...Object.values(userData),
  ]);
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
  const userDetails = fetch(url + '/' + data.id_usuario).then((res) =>
    res.json(),
  );
  const isAuth = await bcryptjs.compare(pass, data.pass);

  if (!isAuth) throw new Erro('Password incorrect');

  const token = jwt.sign({ id_usuario: data.id_usuario }, 'grupoCinco');
  const cookiesOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  console.log('TOKEN: ' + token + ' para el usuario: ' + user);
  return [userDetails, token, cookiesOptions];
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
