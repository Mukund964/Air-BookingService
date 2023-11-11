const bookingService = require('../services/booking-Service');

const bookingservice = new bookingService();

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
    update
}