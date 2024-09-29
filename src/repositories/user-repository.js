const { User } = require('../models')

class UserRepository {

    async insertTuple(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch(error) {
            console.log('something went wrong\n'+error);
            throw error;
        }
    }

    async deleteTuple(userId) {
        try {
            const response = await User.destroy({
                where: {
                    id: userId,
                }
            });
            return response;
        } catch(error) {
            console.log('something went wrong');
            throw error;
        }
    }

    async getUser(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch(error) {
            console.log('something went wrong');
            throw error;
        }
    }
}

module.exports = UserRepository;