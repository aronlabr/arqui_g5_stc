const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../../infraestructura/conexion/db');
const servicios = require('../servicios/authservicios');
const { promisify } = require('util');
const queries = require('../../infraestructura/consultas/queries');

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
    conexion.query(
      'INSERT INTO usuarios SET ?',
      {
        user: user,
        nombre: nombre,
        pass: passHash,
        ape_pat: ape_pat,
        ape_mat: ape_mat,
        dni: dni,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.json('Usuario: ' + user + ' registrado correctamente.');
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

//procedimiento oara login
exports.login = async (req, res) => {
  try {
    const { user, pass } = req.body;
    //const result = await servicios.getUserbyUser(user)
    conexion.query(queries.getUserbyUserQ, [user], async (error, results) => {
      //inicio de sesion correcto
      const id = results[0].id_usuario;
      const token = jwt.sign({ id_usuario: id }, 'grupoCinco');
      console.log('TOKEN: ' + token + ' para el usuario: ' + user);

      const cookiesOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie('jwt', token, cookiesOptions);
      res.json('usuario iniciado');
    });
  } catch (error) {
    console.log(error);
  }
};

//procedimiento para autenticar
exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        'grupoCinco',
      );
      conexion.query(
        'SELECT * FROM usuarios WHERE id_usuario = ?',
        [decodificada.id_usuario],
        (error, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        },
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect('/login');
  }
};

//para cerrar sesion
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.json('sesion cerrada');
};
