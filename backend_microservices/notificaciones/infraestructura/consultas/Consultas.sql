# select all notificaciones
SELECT * FROM g5_db.notificaciones ORDER BY notificaciones.fc_creacion DESC;

# select all notificaciones by user ID
SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = 0 ORDER BY notificaciones.fc_creacion DESC;

# select all notificaciones by user ID
SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = 0 AND DATE(notificaciones.fc_creacion) = '2023-10-24' ORDER BY notificaciones.fc_creacion DESC;

# select last notificaciones by user ID
SELECT * FROM g5_db.notificaciones WHERE notificaciones.id_destino = 0 ORDER BY notificaciones.fc_creacion DESC LIMIT 1;

# Crear nueva notificacion
INSERT INTO g5_db.notificaciones (notificaciones.id_emisor, notificaciones.id_destino, notificaciones.evento, notificaciones.mensaje) VALUES (0, 4, 'NEW_VISITA', 'Hola una nueva visita programada');

# Actualizar notificacion leida
UPDATE g5_db.notificaciones SET notificaciones.estado = 1 WHERE notificaciones.id_notif = 51;