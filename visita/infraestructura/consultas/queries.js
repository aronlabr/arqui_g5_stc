export default {
  getAllVisitas:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita',
  getAllVisitasByCuadrilla:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita WHERE id_cuadrilla = ?',
  getAllPendientes:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita WHERE visita.estado="" ',
  getAllPendientesByCuadrilla:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita WHERE visita.estado="" id_cuadrilla = ?',
  getAllNAoNV:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, motivo, imagen, lat, lon FROM g5_db.visita WHERE estado= ?',
  getAllNAoNVByCuadrilla:
    'SELECT id, id_incidencia, id_cuadrilla, fecha, estado, motivo, imagen, lat, lon FROM g5_db.visita WHERE estado= ? id_cuadrilla = ?',
  getVisitaById:
    'SELECT * FROM g5_db.visita LEFT JOIN g5_db.atencion ON visita.id_atencion = atencion.id_atencion WHERE visita.id = ?',
  createVisita:
    'INSERT INTO g5_db.visita (id_incidencia, id_cuadrilla, fecha) VALUES (?,?,?)',
  updateVisitaNVoNA:
    'UPDATE g5_db.visita SET visita.estado = ?, visita.motivo = ?, visita.imagen = ?, visita.lat = ?, visita.lon = ? WHERE id = ?',
  updatePorAtender: {
    initAtencion: 'INSERT INTO g5_db.atencion VALUES()',
    updateVisita: `UPDATE g5_db.visita SET visita.id_atencion = ?, visita.estado = 'va', 
        visita.lat = ?, visita.lon = ? WHERE visita.id = ?`,
  },
  updateAtencion:
    'UPDATE g5_db.atencion SET atencion.cl_dni = ?, atencion.cl_nombre = ?, atencion.descripcion = ?, atencion.img_antes = ?, atencion.img_desp = ? WHERE atencion.id_atencion = ?;',
  deleteVisita: 'DELETE FROM visita WHERE visita.id = ?',
  deleteAtencion: 'DELETE FROM atencion WHERE atencion.id_atencion = ?',
};
