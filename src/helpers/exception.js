class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}


class AunthenticationError extends CustomError {
    constructor(message = 'Incorrect username or password') {
        super(message, 401);
    }
}

module.exports = AunthenticationError;