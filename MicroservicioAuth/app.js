const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

//para procesar datos enviados desde forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//seteamos las cookiesSSSS
app.use(cookieParser());

//llamar al router
app.use('/', require('./aplicacion/rutas/app.router'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Servidor funcionando en ', app.get('port'));
});
