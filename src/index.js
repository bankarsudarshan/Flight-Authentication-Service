const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes');

const express = require("express");
const app = express(); // create an express app

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(3001, () => {
        console.log(`server up and running on port ${PORT}`);
    })
}

prepareAndStartServer();