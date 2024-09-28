const dotenv = require('dotenv')

dotenv.config(); // this will call our .env file

module.exports = {
    PORT: process.env.PORT,
}