const { StatusCodes } = require('http-status-codes')
const UserService = require('../services/user-service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function signUp(req, res) {
    try {
        const response = await UserService.signUpUser({
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

async function signIn(req, res) {
    try {
        const response = await UserService.signInUser(req.body.email, req.body.password);
        console.log(response);
        return res.send(response);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    signUp,
    signIn
}