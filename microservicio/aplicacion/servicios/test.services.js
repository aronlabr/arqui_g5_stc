import { query } from '../../infraestructura/conexion/db.js';
import consultas from '../../infraestructura/consultas/queries.js';

const getNumberquery = async () => {
  const [result] = await query(consultas.prueba);
  return result;
};

const getNumber = () => {
  return 2;
};

export default { getNumberquery, getNumber };
