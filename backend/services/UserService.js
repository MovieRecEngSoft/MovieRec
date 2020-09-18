const User = require('../database/models/User')
const assert = require('assert')
const crypt = require('../util/crypt.js')

module.exports = {

    async register(user) {
        assert(typeof user.name === 'string')
        assert(typeof user.password === 'string')
        user = new User({
            name: user.name,
            password: await crypt.generateHash(user.password),
        })
        await user.save()
    }

}
