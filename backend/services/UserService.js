const User = require('../database/models/User')
const assert = require('assert')
const crypt = require('../util/crypt.js')
const dbErrorHandler = require('../database/error/handler.js')

function getPublicUserData(user) {
    return {
        _id: user._id,
        name: user.name,
        description: user.description,
        img_path: user.img_path
    }
}

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
        assert(typeof userParams.id === 'string', 'Wrong type of parameter "id".')
        assert(sessionId.equals(userParams.id), "User cannot delete another user.")
        const user = await User.findById(userParams.id)
        if(userParams.img_path){
            console.log(userParams.img_path)
            assert(typeof userParams.img_path === 'string', 'Wrong type of parameter "img_path".')
            user.img_path = userParams.img_path
        }
        if(userParams.description){
            assert(typeof userParams.description === 'string', 'Wrong type of parameter "description".')
            user.description = userParams.description
        }
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
    },

    async toggleFollow(userFollowingId, userToFollowId) {
        const userFollowing = await User.findById(userFollowingId)
        assert(!userFollowing._id.equals(userToFollowId), "User can't follow itself.")

        const followIndex = userFollowing.following.indexOf(userToFollowId)
        if (followIndex === -1) {
            userFollowing.following.push(userToFollowId)
        } else {
            userFollowing.following.splice(followIndex, 1)
        }

        return userFollowing.save()
    },

    async getProfile(userId, sessionUserId = null) {
        const user = await User.findById(userId)
        const userData = getPublicUserData(user)

        if (sessionUserId && userId !== sessionUserId) {
            const sessionUser = await User.findById(sessionUserId)
            const followIndex = sessionUser.following.indexOf(userId)
            userData.userIsFollowing = followIndex !== -1
        } else {
            userData.userIsFollowing = false
        }

        return userData
    },

    getUserSessionData(user) {
        return getPublicUserData(user)
    }

}
