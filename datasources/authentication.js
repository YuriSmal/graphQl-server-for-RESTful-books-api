const { RESTDataSource } = require('apollo-datasource-rest');

class AuthAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000/';
    }

    async loginUser(user) {
        return await this.post(
            'login',
            user
        )
    }

    async logOut(refreshToken) {
        return await  this.delete(
            `logout`,
            refreshToken
        )
    }

    async signUp(user) {
        return await this.post(
            'users',
            user
        )
    }
}

module.exports = AuthAPI;