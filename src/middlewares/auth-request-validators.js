const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/appError');

function validateAuthRequest(req, res, next) {
    if(!req.body.password || !req.body.email) {
        ErrorResponse.message = 'Failed to validate user';
        ErrorResponse.error = new AppError('incorrect email or password', StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateAuthRequest,
}