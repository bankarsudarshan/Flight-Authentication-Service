const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes');
const UserService = require('./services/user-service');

const express = require("express");
const app = express(); // create an express app

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(3001, () => {
        console.log(`server up and running on port ${PORT}`);
        // const response = UserService.verifyToken('eyJhbGciOiJIUzINiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkb2xvdmVzc2RvQGdtYWlsLmNvbSIsImlkIjoxMCwiaWF0IjoxNzI3Njg5ODI4LCJleHAiOjE3Mjc2OTM0Mjh9.gAFjIkHCwFFus-cidCV-2CEdDzy1cTgAL4V8bcJew0Y');
        // console.log(response);
    })
}

prepareAndStartServer();