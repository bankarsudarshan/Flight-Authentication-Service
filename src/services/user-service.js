const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/serverConfig')
const UserRepository = require('../repositories/user-repository');

const userRepository = new UserRepository();

async function addUser(data) {
    try {
        const user = await userRepository.insertTuple(data);
        return user;
    } catch(error) {
        console.log("something went wrong");
        throw error;
    }
}

function createToken(user) { // can't understand the async implementation of jwt.
    try {
        const token = jwt.sign(user, TOKEN_SECRET, { expiresIn: '1h' });
        return token;
    } catch(error) {
        console.log("something went wrong");
        throw error;
    }
}

function verifyToken(token) {
    try {
        const response = jwt.verify(token, TOKEN_SECRET);
        return response;
    } catch(error) {
        console.log("something went wrong");
        throw error;
    }
}

module.exports = {
    addUser,
    createToken,
    verifyToken,
}