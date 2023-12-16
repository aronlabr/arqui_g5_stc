export default {
  getAllNotif:
    'SELECT * FROM g5_db.notificaciones ORDER BY notificaciones.fc_creacion DESC',
  getAllByID:
    'SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = ? ORDER BY notificaciones.fc_creacion DESC',
  getAllToday:
    'SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = ? AND DATE(notificaciones.fc_creacion) = ? ORDER BY notificaciones.fc_creacion DESC',
  getLastNotif:
    'SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = 0 ORDER BY notificaciones.fc_creacion DESC LIMIT 1',
  createNotif:
    'INSERT INTO g5_db.notificaciones (notificaciones.id_emisor, notificaciones.id_destino, notificaciones.evento, notificaciones.mensaje) VALUES (?, ?, ?, ?)',
  readeNotif:
    'UPDATE g5_db.notificaciones SET notificaciones.estado = 1 WHERE notificaciones.id_notif = ?',
};
