const API_KEY = process.env.API_KEY;

const formatValues = {
  newvisita: (data) => ({
    incidencia: parseInt(data?.incidencia),
    fecha: new Date(data?.fecha),
    cuadrilla: parseInt(data?.cuadrilla),
  }),
  updatenv: (data) => ({
    estado: String(data?.estado),
    motivo: String(data?.motivo),
    imagen: String(data?.imagen),
    lat: parseFloat(data?.lat),
    lon: parseFloat(data?.lon),
  }),
};

// export const handler = async (event) => {
const format = async (event) => {
  event = typeof event === 'string' ? JSON.parse(event) : event;

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Check for the presence of the API key
  const apiKey = event.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }
  // TODO implement
  try {
    console.info('Iniciando funcion');

    const { tipo, data } = event.body;
    const formated = formatValues[tipo](data);
    console.info('Valores formateados ', formated);
    return {
      statusCode: 200,
      body: JSON.stringify('Valores formateados!'),
    };
  } catch (error) {
    console.error('Error executing Lambda function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

// const event = {
//   body: {
//     tipo: 'newvisita',
//     data: {
//       incidencia: '1',
//       fecha: '2021-08-26 20:00:00',
//       cuadrilla: '1',
//     },
//   },
// };

// const event = {
//   body: {
//     tipo: 'updatenv',
//     data: {
//       estado: 'va',
//       lat: '12.123456',
//       lon: '-12.123456',
//     },
//   },
// };

// const event = {
//   body: {
//     tipo: 'updatenv',
//     data: {
//       estado: 'vn',
//       motivo: 'motivo 1',
//       imagen: 'imagen 1',
//       lat: '12.123456',
//       lon: '-12.123456',
//     },
//   },
// };

await format(event);
