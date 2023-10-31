const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const servicios = require('../servicios/authservicios');

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const {
      user,
      pass,
      nombre,
      ape_pat,
      ape_mat,
      dni,
      telefono,
      direccion,
      correo,
    } = req.body;
    let passHash = await bcryptjs.hash(pass, 8);
    //console.log(passHash)
    const result = await servicios.createNewUser({
      user,
      pass: passHash,
      nombre,
      ape_pat,
      ape_mat,
      dni,
      telefono,
      direccion,
      correo,
    });
    console.log('Usuario: ' + user + ' registrado correctamente.');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

//procedimiento oara login
exports.login = async (req, res) => {
  try {
    const { user, pass } = req.body;

    const [token, cookiesOptions] = await servicios.loginUser({ user, pass });

    res.cookie('jwt', token, cookiesOptions);
    res.json({ login: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//procedimiento para autenticar
exports.isAuthenticated = async (req, res, next) => {
  try {
    if (!req.cookies.jwt) throw new Error('No JWT available');

    const isLive = await servicios.isSesionLive(jwt);

    if (!isLive) res.status(400).json({ login: false });

    res.status(200).json({ login: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
    return next();
  }
};

//para cerrar sesion
exports.logout = (req, res) => {
  try {
    if (!req.cookies.jwt) throw new Error('No JWT found');
    res.clearCookie('jwt');
    res.status(200).json({ login: false });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
