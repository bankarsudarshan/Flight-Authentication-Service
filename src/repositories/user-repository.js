const { User, Role } = require('../models')

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

    async getByEmail(email) {
        try {
            const user = User.findOne({
                where: {
                    email: email,
                },
            });
            return user;
        } catch(error) {
            console.log('something went wrong');
            throw error;
        }
    }

    async addRole(userId, role) {
        try {
            const user = await User.findByPk(userId);
            const roleId = await Role.findOne({
                where: {
                    name: role
                }
            })
            console.log(user);
            const response = await user.addRole(roleId);
            return response;
        } catch (error) {
            console.log('something went wrong');
            throw error;
        }
    } 

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN',
                }
            });
            console.log(user, adminRole);
            return user.hasRole(adminRole);
        } catch(error) {
            console.log('something went wrong');
            throw error;
        }
    }
}

module.exports = UserRepository;