const amqplib = require('amqplib');
const {EXCHANGE_NAME,MSG_BROKER_URL} = require('../config/server-config');

const createChannel = async() => {
    try {
        const connection = await amqplib.connect(MSG_BROKER_URL);
        const channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
        
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async(channel,service,binding_Key) =>{
    try {
        const applicationQueue = await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(applicationQueue,EXCHANGE_NAME,binding_Key);
        channel.consume(applicationQueue.queue,msg => {
            console.log('Received data');
            console.log(msg.content.toString());
            channel.ack(msg);
        })
    } catch (error) {
        throw error;
    }
}

const publishMessage = async(channel, binding_Key,message) => {
    try {
        await channel.assertQueue('QUEUE_NAME')
        await channel.publish(EXCHANGE_NAME,binding_Key,Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}