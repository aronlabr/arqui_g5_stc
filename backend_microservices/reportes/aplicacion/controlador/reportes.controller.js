import reportesServices from '../servicios/reportes.services.js';

const getData = async (req, res, next) => {
  try {
    const result = await testServices.getData();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const postPage = (req, res) => {
  res.send('POST request to the homepage');
};

export default { getData, getConnection, postPage, putPage, deletePage };
