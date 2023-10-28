/* Message Broker - RabbitMQ */
import amqplib from 'amqplib';
import {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
  NOTIF_BINDING_KEY,
} from '../../aplicacion/config.js';

// Create channel
export async function createChannel() {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    console.log('Message broker set up successfully.');
    return channel;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Suscribe messages
export async function subscribeMessage({ channel, service }) {
  try {
    const appQueue = await channel.assertQueue(QUEUE_NAME);

    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, NOTIF_BINDING_KEY);

    channel.consume(appQueue.queue, async (data) => {
      console.log('receive data');
      console.log(data.content.toString());
      await service.subscribeEvent(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
