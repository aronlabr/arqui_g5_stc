export class Visita {
  constructor(id_incidencia, id_cuadrilla, estado, fecha) {
    this.id_incidencia = id_incidencia;
    this.id_cuadrilla = id_cuadrilla;
    this.estado = estado;
    this.fecha = fecha;
    this.id_atencion = null;
    this.motivo = null;
    this.imagen = null;
    this.lat = null;
    this.lon = null;
  }
}
