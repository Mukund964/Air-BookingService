const dotenv = require('dotenv');
dotenv.config();

module.exports ={
    PORT : process.env.PORT,
    SYNC:process.env.SYNC,
    FLIGHT_SERVICE_PATH:process.env.FLIGHT_SERVICE_PATH
}