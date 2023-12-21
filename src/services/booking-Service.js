const bookingRepository = require('../repository/booking_repo');
const {FLIGHT_SERVICE_PATH,REMINDER_BINDING_KEY} = require('../config/server-config');
const axios = require('axios');
const {StatusCodes} = require('http-status-codes');
const {validationError, ServerError,AppError} = require('../utils/index');
const {createChannel,publishMessage} = require('../utils/MessageQueues');
class bookingService{
    constructor(){
        this.bookingRepo=new bookingRepository();
    }
    async sendMessageToQueue(){
        try {
            const channel = await createChannel();
            let id = 2;
            const data = {
                subject : `This is subject ${id}`,
                content : `This is content ${id}`,
                recipietEmail : 'sd88028@gmail.com',
                notificationTime : new Date()
            }
            publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
            id++;
        } catch (error) {
            throw error;
        }
    }
    async create(data){
        try {
            let flightId = data.flightId;
            const getFlightUrlRequest = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            let flight = await axios.get(getFlightUrlRequest);
            let flightData = flight.data.data;
            if(flightData.TotalSeats < data.noOfSeats){
                throw {error : "Insufficient Seats"};
            }
            let totalTicketCost = data.noOfSeats * flightData.Price;
            let remainingSeats = flightData.TotalSeats - data.noOfSeats;
            let bookingPayLoad = {...data,totalTicketCost};
            const booking = await this.bookingRepo.create(bookingPayLoad);
            const updateFlightUrlRequest = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightId}`;
            await axios.patch(updateFlightUrlRequest,{TotalSeats : remainingSeats});
            const finalbooking = await this.bookingRepo.update(booking.id,{status:"Confirmed"});
            this.sendMessageToQueue();
            return finalbooking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') throw new validationError();
            else {
                throw new AppError(
                    error.message || 'An Error Occurred',
                    "Something went wrong on Server side",
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            }
        }
    }

    async update(BookingId,data){
        try {
            const booking = await this.bookingRepo.update(BookingId,data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') throw new validationError();
            else {
                throw new ServerError();
            }
        }
    }
}

module.exports = bookingService;
