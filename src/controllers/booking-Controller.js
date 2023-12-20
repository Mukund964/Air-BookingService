const { BOOKING_BINDING_KEY } = require('../config/server-config');
const bookingService = require('../services/booking-Service');
const {createChannel,publishMessage} = require('../utils/MessageQueues');

const bookingservice = new bookingService();

const sendMessageToQueue = async(req,res) =>{
    try {
        const channel = await createChannel();
        const data = {Message : 'Sending Msg'};
        publishMessage(channel,BOOKING_BINDING_KEY,JSON.stringify(data));
        return res.status(201).json({message:'Successfully sent to Queue!'});
        
    } catch (error) {
        
    }
}
const create = async (req,res) =>{
    try {
        const booking = await bookingservice.create(req.body);
        return res.status(200).json({
            data:booking,
            message: "Booking created successfully",
            success:true,
            err : {}
        })
    } catch (error) {
        console.log("at controller",error);
        res.status(500).json({
            data : {},
            message: "not created succesfully",
            success : false,
            err : {error}
        })
    }
}

const update = async (req,res) =>{
    try {
        const booking = await bookingService.update(req.params.id,req.body);
        return booking;
    } catch (error) {
        console.log("at controller",error);
        res.status(500).json({
            data : {},
            message: "not created succesfully",
            success : false,
            err : {error}
        })
    }
}
module.exports={
    create,
    update,
    sendMessageToQueue
}