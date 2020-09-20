const UserService = require('../services/UserService.js')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')

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
            assert(request.body.id, 'Missing parameter "id".')
            assert(request.body.img_path || request.body.description, 'Missing user parameters for updating.')
            const sessionId = request.user._id
            userParams = {
                id: request.body.id,
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

    async getUserSession(request, response) {
        try {
            let sessionData = {
                authenticated: request.isAuthenticated()
            }
            if (request.isAuthenticated()) {
                sessionData.user = UserService.getUserSessionData(request.user)
            }
            return response.status(200).send(sessionData)
        } catch(error) {
            response.status(500).send(error.toString())
        }
    }

}
