// Para la tabla Incidencia
export default {
    // Consulta para obtener todas las incidencias
    getAllIncidents: 'SELECT * FROM incidencia',
  
    // Consulta para obtener incidencias por el ID del cliente
    getIncidentsByClientId: 'SELECT * FROM incidencia WHERE id_cliente = ?',

    //Consulta para obtener incidencias por el ID del Punto de Atención
    getIncidentsByPuntoAtencionID : 'SELECT * FROM incidencia WHERE id_puntoatencion = ?',

    //Consulta para obtener incidencias ya resueltas
    getSolvedIndcidents: 'SELECT * FROM incidencia WHERE estado == 1',

    //Consulta para obtener incidencias no resueltas
    getNotSolvedIncidents : 'SELECT * FROM incidencia WHERE estado == 0',

    //Consulta para obtener incidencias por fecha de creacion
    getIncidentsByCreationDate: 'SELECT * FROM incidencia WHERE fc_creacion = ?',
  
    // Consulta para crear una nueva incidencia
    createIncident: 'INSERT INTO incidencia (id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob, fc_creacion) VALUES (?, ?, ?, ?, ?, NOW())',

    // Consulta para insertar un nuevo punto de atención
    insertNewServicePoint: 'INSERT INTO PuntoAtencion (latitud, longitud, direccion, ubigeo, foto) VALUES (?, ?, ?, ?, ?)',

    // Consulta para actualizar la descripción de la solución de una incidencia específica
    updateIncidentSolution: 'UPDATE incidencia SET descripcion_sol = ? WHERE id_incidencia = ?',
  };