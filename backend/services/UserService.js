const User = require('../database/models/User')
const Follow = require('../database/models/Follow')
const assert = require('assert')
const crypt = require('../util/crypt.js')
const dbErrorHandler = require('../database/error/handler.js')
const ActivityService = require('./ActivityService')
const MovieService = require('../services/MovieService.js')
const MovieFilter = MovieService.MovieFilter
const SearchParams = MovieService.SearchParams

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
        const user = await User.findById(sessionId)
        if(userParams.img_path){
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
        assert(userFollowingId !== userToFollowId, "User can't follow itself.")
        let follow = await Follow.findOne({ userFollowing: userFollowingId, userFollowed: userToFollowId })

        if (follow === null) {
            follow = new Follow({ userFollowing: userFollowingId, userFollowed: userToFollowId })
            return follow.save()
        } else {
            return Follow.deleteOne({ userFollowing: userFollowingId, userFollowed: userToFollowId })
        }
    },

    async getProfile(userId, sessionUserId = null) {
        const user = await User.findById(userId)
        const userData = getPublicUserData(user)

        if (sessionUserId && userId !== sessionUserId) {
            const follow = await Follow.findOne({ userFollowing: sessionUserId, userFollowed: userId })
            userData.userIsFollowing = follow !== null
        } else {
            userData.userIsFollowing = false
        }

        const following = await Follow.find({ userFollowing: userId })
        const followers = await Follow.find({ userFollowed: userId })

        userData.numFollowing = following.length
        userData.numFollowers = followers.length

        return userData
    },

    async getUserActivity(userId) {
        const userActivity = await ActivityService.getUserActivities(userId)
        return userActivity || []
    },

    async getFollowingActivity(sessionUserId = null) {
        if (!sessionUserId) {
            return []
        }
        const follows = await Follow.find({ userFollowing: sessionUserId })
        const followingUsers = follows.map(follow => follow.userFollowed)
        let activity = []

        if (followingUsers.length > 0) {
            activity = await ActivityService.getUsersActivities(followingUsers)
        }

        return activity
    },

    async getMoviesHistory(sessionUserId, pageFilter){
        let movieFilter = new MovieFilter(
            undefined, undefined, undefined, undefined, undefined,
            sessionUserId, undefined
        )
        let searchParams = new SearchParams(movieFilter, pageFilter)
        const movies = await MovieService.getMovies(searchParams)
        return movies
    },

    async getRecommendedMovies(sessionUserId, pageFilter){
        const user = await User.findById(sessionUserId)
        let moviesIds = []
        for(movieId of user.recommended_movies){
            moviesIds.push(movieId)
        }
        let movies = []
        if(moviesIds){
            let movieFilter = new MovieFilter(
                undefined, undefined, undefined, undefined, undefined,
                undefined, moviesIds
            )
            let searchParams = new SearchParams(movieFilter, pageFilter)
            movies = await MovieService.getMovies(searchParams)
        }
        return movies
    },

    getUserSessionData(user) {
        return getPublicUserData(user)
    }

}
