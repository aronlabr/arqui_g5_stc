const queries = require('../../infraestructura/consultas/queries.js')
const conexion = require('../../infraestructura/conexion/db')

export class Cliente {
    constructor (id_cliente, nombre_full, dni, telefono, direccion, correo, foto){
        this.id_cliente = id_cliente;
        this.nombre_full = nombre_full;
        this.dni = dni;
        this.telefono = telefono;
        this.direccion = direccion;
        this.correo = correo;
        this.foto = foto;
    }
}

module.exports = Cliente;