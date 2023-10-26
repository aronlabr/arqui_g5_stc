/* Message Broker - RabbitMQ */
import amqplib from 'amqplib';
import { MESSAGE_BROKER_URL, EXCHANGE_NAME } from '../../aplicacion/config.js';

// Create channel
export async function createChannel() {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    return channel;
  } catch (error) {
    throw new Error(error.message);
  }
}
// Publish messages
export async function publishMessage({ channel, binding_key, message }) {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    console.log('Mensaje enviado: ' + message);
  } catch (error) {
    throw new Error(error.message);
  }
}
// Suscribe messages
export async function subscribeMessage({ channel, service, binding_key }) {
  try {
    const appQueue = await channel.assertQueue('QUEUE_NAME');
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(appQueue.queue, (data) => {
      console.log('receive data');
      console.log(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
