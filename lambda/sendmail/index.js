import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const SES_CONFIG = {
  region: process.env.REGION || 'sa-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || 'AKIAWS6KXLUUO2NXGCGL',
    secretAccessKey:
      process.env.SECRET_ACCESS_KEY ||
      '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',
  },
};

const ses = new SESClient(SES_CONFIG);

const mail = {
  cliente: (data) => ({
    Html: {
      Charset: 'UTF-8',
      Data: `<html><body><h3>Hola ${data?.name}</h1><p>Gracias por permitirnos visitarte</p>
      <h5>Problema:</h5> <p>${data?.problema}</p>
      <h5>Solucion:</h5> <p>${data?.solucion}</p></body></html>`,
    },
  }),
  tecnico: (data) => ({
    Html: {
      Charset: 'UTF-8',
      Data: `<html><body><h3>Hola ${data?.name}</h1><p>Sus credenciales de inicio son</p>
      <b>Problema:</b> <p>${data?.user}</p>
      <b>Solucion:</b> <p>${data?.pass}</p></body></html>`,
    },
  }),
};

const sendEmail = async (recipientEmail, data) => {
  const params = {
    Source: process.env.SENDER_EMAIL || 'luisaaron.blas@unmsm.edu.pe',
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: mail[data?.tipo](data),
      Subject: {
        Charset: 'UTF-8',
        Data: data?.asunto,
      },
    },
  };
  const command = new SendEmailCommand(params);
  const res = await ses.send(command);
  return res;
};

export const handler = async (event) => {
  // const send = async (event) => {
  // TODO implement
  try {
    console.info('Iniciando funcion');

    const { email, data } = event.body;
    const sended = await sendEmail(email, data);
    console.info('Email enviado ', sended);
    return {
      statusCode: 200,
      body: JSON.stringify('Email from enviado!'),
    };
  } catch (error) {
    console.error('Error executing Lambda function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

send({
  body: {
    email: 'pexos77697@cumzle.com',
    data: {
      tipo: 'tecnico',
      asunto: 'Gracias por contactarnos',
      name: 'Aaron',
      problema: 'problem 1',
      solucion: 'solucion 2',
      user: 'user_1',
      pass: 'pass_1',
    },
  },
});
