const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TOKEN_SECRET } = require('../config/serverConfig')
const UserRepository = require('../repositories/user-repository');

const userRepository = new UserRepository();

async function signUpUser(data) {
    try {
        const user = await userRepository.insertTuple(data);
        return user;
    } catch(error) {
        console.log("something went wrong");
        throw error;
    }
}

async function signInUser(email, plainTextPassword) {
    try {
        // 1 -> check if user exists
        const user = await userRepository.getByEmail(email);
        // 2 -> check if their password is correct
        const matched = checkPassword(plainTextPassword, user.password);
        if(!matched) {
            console.log('The passwords do not match');
            throw {error: 'incorrect password'};
        }
        // 3 -> give them a jwt
        return createToken({email: user.email, id: user.id});
    } catch (error) {
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

function checkPassword(plainTextPassword, hashedpassword) {
    try {
        const matched = bcrypt.compareSync(plainTextPassword, hashedpassword);
        return matched;
    } catch (error) {
        console.log("something went wrong");
        throw error;
    }
}

module.exports = {
    signUpUser,
    createToken,
    verifyToken,
    signInUser,
}