import testServices from '../servicios/test.services.js';

const getHW = async (req, res, next) => {
  res.send('Hello World!');
};

const getConnection = async (req, res, next) => {
  try {
    const result = await testServices.getNumberquery();
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

export default { getHW, getConnection, postPage, putPage, deletePage };
