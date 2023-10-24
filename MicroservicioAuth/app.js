const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

//seteamos motor de plnatillas
app.set('view engine', 'ejs')

//seteamos la caprpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//seteamos las cookiesSSSS
app.use(cookieParser())

//llamar al router
app.use('/', require('./aplicacion/rutas/app.router'))

app.set('port', process.env.PORT || 8080)
app.listen(8080, ()=>{
    console.log('Servidor funcionando en ', app.get('port'))
})