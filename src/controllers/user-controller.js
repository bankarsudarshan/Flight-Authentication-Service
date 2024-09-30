const { StatusCodes } = require('http-status-codes')
const UserService = require('../services/user-service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/appError');

async function signUp(req, res) {
    try {
        const response = await UserService.signUpUser({
            email: req.body.email,
            password: req.body.password,
        });
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
        SuccessResponse.data = response;
        SuccessResponse.message = "Token created";
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        const statuscode = StatusCodes.INTERNAL_SERVER_ERROR;
        if(error.name = "AppError") {
            statuscode = error.statuscode;
        }
        return res
                .status(statuscode)
                .json(ErrorResponse);
    }
}

async function isAuthenticated(req, res) {
    try {
        const token = req.headers['x-access-token'];
        const response = await UserService.isAuthenticated(token);
        SuccessResponse.data = response;
        SuccessResponse.message = "Authentic client";
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    signUp,
    signIn,
    isAuthenticated,
}