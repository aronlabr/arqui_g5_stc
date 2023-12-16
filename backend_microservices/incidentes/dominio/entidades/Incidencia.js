const queries = require('../../infraestructura/consultas/queries.js')
const conexion = require('../../infraestructura/conexion/db')

export class Incidencia {
    constructor(id_incidencia, id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob, descripcion_sol,fc_creacion){
        this.id_incidencia = id_incidencia;
        this.id_cliente = id_cliente;
        this.id_puntoatencion = id_puntoatencion;
        this.estado = estado;
        this.fecha_ruta = fecha_ruta;
        this.descripcion_prob = descripcion_prob;
        this.desccripcion_sol = descripcion_sol;
        this.fc_creacion = fc_creacion;
    }
}

module.exports = Incidencia;