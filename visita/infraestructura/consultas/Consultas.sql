# select all visitas
SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita;

# select all visitas by cuadrilla id
SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita WHERE id_cuadrilla = 1;

# select pendientes
SELECT id, id_incidencia, id_cuadrilla, fecha, estado, id_atencion FROM g5_db.visita WHERE visita.estado="";

# select pendientes by cuadrilla
SELECT * FROM g5_db.visita WHERE visita.estado='' and id_cuadrilla = 1;

# select atendidos
SELECT id, id_incidencia, id_cuadrilla, id_atencion, fecha, estado, lat, lon FROM g5_db.visita WHERE estado='va';

# select atendidos by cuadrilla
SELECT id, id_incidencia, id_cuadrilla, id_atencion, fecha, estado, lat, lon FROM g5_db.visita WHERE estado='va' and id_cuadrilla = 1;

# select vistados no atendidos by cuadrilla
SELECT id id_incidencia, id_cuadrilla, fecha, estado, motivo, imagen, lat, lon FROM g5_db.visita WHERE estado='vna';

# select vistados no atendidos by cuadrilla
SELECT id, id_incidencia, id_cuadrilla, fecha, estado, motivo, imagen, lat, lon FROM g5_db.visita WHERE id_cuadrilla = 1 and estado='nv';

# select no atendidos/visitados
# ? = 'vna' 'nv'
SELECT id, id_incidencia, id_cuadrilla, fecha, estado, motivo, imagen, lat, lon FROM g5_db.visita WHERE estado=?;

# select visita by id
SELECT * FROM g5_db.visita LEFT JOIN g5_db.atencion ON visita.id_atencion = atencion.id_atencion WHERE visita.id = 3;

# Crear nueva visita
# (4, 2,'2023-11-15 00:00:33');
INSERT INTO g5_db.visita (id_incidencia, id_cuadrilla, fecha) VALUES (80,2,'2023-11-15 00:00:33');

# Actualizar Visita nv
# ('nv', 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy.', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8', 44.000, -88.000) by id=5
UPDATE g5_db.visita SET visita.estado = ?, visita.motivo = ?, visita.imagen = ?, visita.lat = ?, visita.lon = ? WHERE id = ?;
UPDATE g5_db.visita SET visita.estado = 'nv', visita.motivo = 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy.', 
visita.imagen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8', visita.lat = 44.000, visita.lon = -88.000 WHERE id = 81;

# Visita con Atencion
START TRANSACTION;
	INSERT INTO g5_db.atencion VALUES();
	SET @last_insert_id_atencion = LAST_INSERT_ID();
	UPDATE g5_db.visita SET visita.id_atencion = @last_insert_id_atencion, visita.estado = ?, visita.lat = ?, visita.lon = ? WHERE visita.id = ?;
COMMIT;

# Actualizar informacion nueva atencion
UPDATE g5_db.atencion SET atencion.cl_dni = ?, atencion.cl_nombre = ?, atencion.descripcion = ?, atencion.img_antes = ?, atencion.img_desp = ? WHERE atencion.id_atencion = ?;

# Eliminar visita
DELETE FROM visita WHERE visita.id = ?

# Eliminar notificaciones
DELETE FROM atencion WHERE atencion.id_atencion = ?;