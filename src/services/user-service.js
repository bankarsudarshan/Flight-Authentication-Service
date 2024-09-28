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

module.exports = {
    addUser,
}