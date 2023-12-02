import Cors from 'cors';
import initMiddleware from '../../libs/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  }),
);

const handler = async (req, res) => {
  // Enable CORS for the route
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Assuming mail is passed in the request body
    const { mail } = req.body;

    // Perform email sending logic here
    const resMail = await fetch(`${process.env.LAMBDA_URL}/sendEmail`, {
      method: 'POST',
      body: JSON.stringify(mail), // Assuming mail is an object, make sure to stringify it
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
    if (resMail.ok) {
      const result = await resMail.json();
      res
        .status(200)
        .json({ success: true, message: 'Email sent successfully' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    // Respond with success message
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
