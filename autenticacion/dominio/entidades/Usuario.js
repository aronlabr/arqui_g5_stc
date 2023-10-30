const queries = require('../../infraestructura/consultas/queries.js')
const conexion = require('../../infraestructura/conexion/db')

export class Usuario {
    constructor(user, pass, nombre, ape_pat, ape_mat, dni, telefono, direccion, correo){
        this.user = user, 
        this.pass = pass, 
        this.nombre = nombre, 
        this.ape_pat = ape_pat, 
        this.ape_mat = ape_mat, 
        this.dni = dni, 
        this.telefono = telefono, 
        this.direccion = direccion, 
        this.correo = correo
    }

    getDatos() {
        return this.user = user, this.nombre = nombre, this.correo = correo
    }
}