const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config(); // this will call our .env file

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(8),
    TOKEN_SECRET: process.env.TOKEN_SECRET,
}