import testServices from '../servicios/test.services.js';

// Custom error handler
const errorWrapper = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Send an error response with the appropriate status code and a custom error message
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
};

// Admin

const getAllVisitas = async (req, res) => {
  try {
    const result = await testServices.getAllVisitas();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const getVisitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await testServices.getVisitaById(id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const createVisita = async (req, res) => {
  try {
    const { incidencia, cuadrilla, fecha } = req.body;
    const result = await testServices.createVisita({
      incidencia,
      cuadrilla,
      fecha,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(301).json('Error de peticion');
  }
};

// Tecnico

const getAllVisitasByCuadrilla = async (req, res) => {
  try {
    const cuadrilla = req.params.id;
    const result = await testServices.getAllVisitasByCuadrilla(cuadrilla);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const updateVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    let result;
    const visita = await testServices.getVisitaById(id);
    if (visita.estado) throw new Error('State already register');
    if (estado === 'nv' || estado === 'vna') {
      const { motivo, imagen, lat, lon } = req.body;
      result = await testServices.updateVisitaNVoNA({
        ...{ id, estado, motivo, imagen, lat, lon },
      });
    } else if (estado === 'va') {
      const { lat, lon } = req.body;
      result = await testServices.updateVisitaAtencionTr({
        ...{ id, estado, lat, lon },
      });
    } else throw new Error("Incorrect state. Expected 'nv' or 'vna' or 'va'");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const registerAtencion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id_atencion } = await testServices.getVisitaById(id);

    if (!id_atencion) throw new Error('Id Atencion incorrecto');

    let { nombre, dni, descrip, imgAnt, imgDes } = req.body;
    const result = await testServices.updateAtencion({
      ...{ id, id_atencion, nombre, dni, descrip, imgAnt, imgDes },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// prueba
const getConnection = async (req, res, next) => {
  try {
    const result = await testServices.createAtencionTr({}, {});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const postPage = (req, res) => {
  res.send('POST request to the homepage');
};

const putPage = (req, res) => {
  const { id, name, description } = req.body;
  res.send(`Name ${id} ${name}, desc ${description}`);
};

const deletePage = (req, res) => {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
};

export default {
  errorWrapper,
  getAllVisitas,
  getVisitaById,
  createVisita,
  updateVisita,
  registerAtencion,
  getAllVisitasByCuadrilla,
  getConnection,
  deletePage,
};
