const UserService = require('../services/UserService.js')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')
const PageFilter = require('../services/MovieService.js').PageFilter

module.exports = {

    async register(request, response) {
        try{
            assert(request.body.name != undefined, 'Missing parameter "name".')
            assert(request.body.password != undefined, 'Missing parameter "password".')
            await UserService.register(request.body)
            response.sendStatus(201)
        }
        catch(error){
            if(error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else if(error instanceof dbErrors.DBDuplicatedKeyError)
                response.status(409).send(error.toString())
            else{
                response.status(500).send(error.toString())
            }
        }
    },

    async edit(request, response){
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.img_path || request.body.description, 'Missing user parameters for updating.')
            const sessionId = request.user._id
            userParams = {
                img_path: request.body.img_path,
                description: request.body.description
            }
            await UserService.edit(sessionId, userParams)
            return response.sendStatus(204)
        }
        catch(error){
            if(error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else{
                response.status(500).send(error.toString())
            }
        }
    },

    async toggleFollow(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.userId, 'Missing parameter "userId".')

            const userToFollowId = request.body.userId
            const userFollowingId = request.user._id

            await UserService.toggleFollow(userFollowingId, userToFollowId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getProfile(request, response) {
        try {
            assert(request.query.userId, 'Missing parameter "userId".')

            const userId = request.query.userId
            const sessionUserId = request.user ? request.user._id : null

            const profile = await UserService.getProfile(userId, sessionUserId)

            return response.json(profile)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getFollowingActivity(request, response) {
        try {
            const sessionUserId = request.user ? request.user._id : null

            const activity = await UserService.getFollowingActivity(sessionUserId)

            return response.json(activity)
        } catch(error) {
            response.status(500).send(error.toString())
        }
    },

    async getMoviesHistory(request, response){
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            const userId = request.user._id
            let pageFilter = new PageFilter(
                request.query.page? parseInt(request.query.page): undefined,
                request.query.limit? parseInt(request.query.limit): undefined
            )
            const movies = await UserService.getMoviesHistory(userId, pageFilter);
            return response.json(movies)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getUserSession(request, response) {
        try {
            let sessionData = {
                authenticated: request.isAuthenticated()
            }
            if (request.isAuthenticated()) {
                sessionData.user = UserService.getUserSessionData(request.user)
            }
            return response.json(sessionData)
        } catch(error) {
            response.status(500).send(error.toString())
        }
    }

}
