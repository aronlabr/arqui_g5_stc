const queries = require('../../infraestructura/consultas/queries.js')
const conexion = require('../../infraestructura/conexion/db')

export class PuntoAtencion {
    constructor(id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo, foto){
        this.id_puntoatencion = id_puntoatencion;
        this.id_cliente = id_cliente;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.ubigeo = ubigeo;
        this.foto = foto;
    }
}

module.exports = PuntoAtencion