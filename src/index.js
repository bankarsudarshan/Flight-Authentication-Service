const { PORT } = require('./config/serverConfig')

const express = require("express")
const app = express(); // create an express app

app.listen(3001, () => {
    console.log(`server up and running on port ${PORT}`);
})

