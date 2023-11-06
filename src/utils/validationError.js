const {StatusCodes} = require('http-status-codes');
class validationError extends Error {
    constructor(){
        let explanation = [];
        Error.error.forEach(name => {
                explanation.push(name);
        });
        super();
        this.name = 'ValidationError'
        this.message = 'not able to fetch client request';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
};
module.exports = validationError;