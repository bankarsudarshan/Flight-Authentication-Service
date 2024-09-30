const { StatusCodes } = require('http-status-codes')
const UserService = require('../services/user-service');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const AppError = require('../utils/appError');

const userService = new UserService();

async function signUp(req, res) {
    try {
        const response = await userService.signUpUser({
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
        const response = await userService.signInUser(req.body.email, req.body.password);
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
            statuscode = StatusCodes.INTERNAL_SERVER_ERROR
        return res
                .status(statuscode)
                .json(ErrorResponse);
        }
    }
}

async function isAuthenticated(req, res) {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        SuccessResponse.data = response;
        SuccessResponse.message = "Authentic client";
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function addRole(req, res) {
    try {
        const response = await userService.addRole(req.body.id, req.body.role);
        SuccessResponse.data = response;
        SuccessResponse.message = "user role updated";
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function isAdmin(req, res) {
    try {
        const response = await userService.isAdmin(parseInt(req.body.id, 10));
        SuccessResponse.data = response;
        SuccessResponse.message = "request processed successfully";
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    signUp,
    signIn,
    isAuthenticated,
    addRole,
    isAdmin,
}