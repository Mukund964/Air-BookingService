const { ValidationError,AppError } = require('sequelize');
const {StatusCodes} = require('http-status-codes');
const {booking} = require('../models/index');

class bookingRepository{
    async create(data){
        try {
            const book = await booking.create(data);
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
}
module.exports = bookingRepository;