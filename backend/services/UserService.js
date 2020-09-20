const User = require('../database/models/User')
const assert = require('assert')
const crypt = require('../util/crypt.js')
const dbErrorHandler = require('../database/error/handler.js')
const { edit } = require('../controllers/UserController')

module.exports = {

    async register(user) {
        assert(typeof user.name === 'string', 'Wrong type of parameter "name".')
        assert(typeof user.password === 'string', 'Wrong type of parameter "password".')
        user = new User({
            name: user.name,
            password: await crypt.generateHash(user.password)
        })
        try{
            await user.save()
        }
        catch(error){
            dbErrorHandler.handle(error)
        }
    },

    async edit(sessionId, userParams){
        assert(typeof user.id === 'string', 'Wrong type of parameter "id".')
        assert(user.id.equals(sessionId), "User cannot delete another user.")
        assert(typeof user.poster_path === 'string', 'Wrong type of parameter "poster_path".')
        assert(typeof user.description === 'string', 'Wrong type of parameter "description".')
        const user = await User.findById(userParams._id)
        user.poster_path = poster_path
        user.description = description
        await user.save()
    },

    async findById(id){
        try{
            return await User.findById(id).exec()
        }
        catch(error){
            dbErrorHandler.handle(error)
        }
    },

    async findOne(filter){
        try{
            return await User.findOne(filter).exec()
        }
        catch(error){
            dbErrorHandler.handle(error)
        }
    },

    async validadatePassword(user, password){
        return await crypt.compare(password, user.password)
    }

}
