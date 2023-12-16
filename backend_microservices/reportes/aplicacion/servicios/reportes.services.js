import { API_INCID } from '../config';

const getNumberquery = async () => {
  const [result] = await fetch(`${API_INCID}/`);
  return result;
};

const getNumber = () => {
  return 2;
};

export default { getNumberquery, getNumber };
