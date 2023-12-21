const { ValidationError,AppError } = require('sequelize');
const {StatusCodes} = require('http-status-codes');
const {Booking} = require('../models/index');

class bookingRepository{
    async create(data){
        try {
            console.log("Repo called");
            const book = await Booking.create(data);
            return book;
        } catch (error) {
            if(error.name == 'validation Error'){
                throw new ValidationError(error);
            }
            else{
                throw new AppError(
                    error.error.name,
                    "Something wrong",
                    "Server not Responsding correctly try again later",
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async update(BookingId,data){
        try {
            const booking = await Booking.update(data,{
                where :{
                    id: BookingId
                }
            });
            return booking;
        } catch (error) {
            if(error.name == 'validation Error'){
                throw new ValidationError(error);
            }
            else{
                throw new AppError(
                    error.error.name,
                    "Something wrong",
                    "Server not Responsding correctly try again later",
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
}
module.exports = bookingRepository;