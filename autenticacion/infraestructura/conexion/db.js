const mysql = require('mysql')
const { HOST, DBPORT, USER, PASS, DBNAME } = require('../../config')

const conexion = mysql.createConnection({
    host: HOST,
    port: DBPORT,
    user: USER,
    password: PASS,
    database: DBNAME
})

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('Conexión con base de datos exitosa')
})

module.exports = conexion