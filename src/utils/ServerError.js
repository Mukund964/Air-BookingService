const {StatusCodes} = require('http-status-codes');
class ServiceError extends Error{
    constructor(
        message = "Internal Server Error",
        explanation ="Something went wrong",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name='ServiceError';
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode
    }
};

module.exports = ServiceError;