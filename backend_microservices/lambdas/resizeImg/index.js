import Jimp from 'jimp-compact';
const API_KEY = process.env.API_KEY;

export const handler = async (event) => {
  // const resize = async (event) => {
  const event = typeof event === 'string' ? JSON.parse(event) : event;

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

  console.info('Iniciando funcion');
  try {
    const { imageBase64 } = event.body;
    console.info('Imagen recibida ', typeof imageBase64);
    const resizedImageBase64 = await resizeImage(imageBase64, 480, 480);
    console.info('Imagen redimensionanda completada');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Imagen redimensionanda',
        img: resizedImageBase64,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error executing Lambda function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

const resizeImage = async (imageBase64, width, height) => {
  if (!imageBase64 || typeof imageBase64 !== 'string') {
    throw new Error('Invalid base64 string');
  }
  const image = await Jimp.read(imageBase64);
  // const mime = image.getMIME();
  const mime = Jimp.MIME_JPEG;
  if (!mime) {
    throw new Error('Could not determine MIME type');
  }
  return image.resize(width, height).quality(60).getBase64Async(mime);
};
