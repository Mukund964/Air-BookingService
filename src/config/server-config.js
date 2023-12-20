const dotenv = require('dotenv');
dotenv.config();

module.exports ={
    PORT : process.env.PORT,
    SYNC:process.env.SYNC,
    FLIGHT_SERVICE_PATH:process.env.FLIGHT_SERVICE_PATH,
    MSG_BROKER_URL:process.env.MSG_BROKER_URL,
    EXCHANGE_NAME :process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY:process.env.REMINDER_BINDING_KEY
}