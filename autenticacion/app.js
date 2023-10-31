const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

//para procesar datos enviados desde forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
//seteamos las cookiesSSSS
app.use(cookieParser());

//llamar al router
app.use('/', require('./aplicacion/rutas/app.router'));

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log('Servidor funcionando en ', app.get('port'));
});
