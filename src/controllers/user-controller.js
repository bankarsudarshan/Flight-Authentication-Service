const { StatusCodes } = require('http-status-codes')
const UserService = require('../services/user-service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function addUser(req, res) {
    try {
        const response = await UserService.addUser({
            email: req.body.email,
            password: req.body.password,
        })
        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully created a new user";
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    addUser,
}