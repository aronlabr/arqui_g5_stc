// services/incidentService.js
const conex = require('../../infraestructura/conexion/db');
const consultas = require('../../infraestructura/consultas/queries.js');

const getAllIncidents = async () => {
    return new Promise((resolve, reject) => {
      const query = consultas.getAllIncidents;
      conex.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

const getIncidentsByClientId = async (clientId) => {
    return new Promise((resolve, reject) => {
      const query = consultas.getIncidentsByClientId;
      conex.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};

const getIncidentsByIncidentId = async (incidentId) => {
  return new Promise((resolve, reject) => {
    const query = consultas.getIncidentsByIncidentID;
    conex.query(query, [incidentId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
  
const getIncidentsByPuntoAtencionID = async (puntoAtencionId) => {
    return new Promise((resolve, reject) => {
      const query = consultas.getIncidentsByPuntoAtencionID;
      conex.query(query, [puntoAtencionId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};
  
const getSolvedIndcidents = async () => {
    return new Promise((resolve, reject) => {
      const query = consultas.getSolvedIndcidents;
      conex.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
const getNotSolvedIncidents = async () => {
    return new Promise((resolve, reject) => {
      const query = consultas.getNotSolvedIncidents;
      conex.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};
  
const getIncidentsByCreationDate = async (creationDate) => {
    return new Promise((resolve, reject) => {
      const query = consultas.getIncidentsByCreationDate;
      conex.query(query, [creationDate], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};
  
const createIncident = async (incidentData) => {
    const { id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob } = incidentData;
    return new Promise((resolve, reject) => {
      const query = consultas.createIncident;
      conex.query(query, [id_cliente, id_puntoatencion, estado, fecha_ruta, descripcion_prob], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};
  
const updateIncidentSolution = async (incidentId, solution) => {
    return new Promise((resolve, reject) => {
      const query = consultas.updateIncidentSolution;
      conex.query(query, [solution, incidentId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};

const updateIncidentStateSolved = async (incidentId) => {
  return new Promise((resolve, reject) => {
      const query = consultas.updateIncidentStateSolved;
      conex.query(query, [incidentId], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};

const createClient = async (clientData) => {
  const { nombre_full, dni, telefono, direccion, correo, foto } = incidentData;
  return new Promise((resolve, reject) => {
    const query = consultas.createClient;
    conex.query(query, [nombre_full, dni, telefono, direccion, correo, foto], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
  

module.exports = {
  getAllIncidents,
  getIncidentsByIncidentId,
  getIncidentsByClientId,
  getIncidentsByPuntoAtencionID,
  getSolvedIndcidents,
  getNotSolvedIncidents,
  getIncidentsByCreationDate,
  createIncident,
  updateIncidentSolution,
  updateIncidentStateSolved,
  createClient,
};
