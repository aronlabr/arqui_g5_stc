const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const servicios = require('../servicios/authservicios');

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const { user, pass, name, dni, phone, address, email } = req.body;
    let passHash = await bcryptjs.hash(pass, 8);
    //console.log(passHash)
    const result = await servicios.createNewUser({
      user,
      pass: passHash,
      name,
      dni,
      phone,
      address,
      email,
    });

    const sendMail = await fetch(`${process.env.LAMBDA_URL}/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        tipo: 'tecnico',
        data: {
          asunto: 'Gracias por contactarnos desde lamda',
          user,
          pass,
        },
      }),
    });
    if (sendMail.ok) {
      const result = await sendMail.json();
      console.log(result);
    } else {
      console.error('Failed to send email');
    }
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

    const [data, token, cookiesOptions] = await servicios.loginUser({
      user,
      pass,
    });

    res.cookie('jwt', token, cookiesOptions);
    res.json({ login: true, data });
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
