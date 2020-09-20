const UserService = require('../services/UserService')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')
const { editComment } = require('../services/ReviewService')

module.exports = {

    async register(request, response) {
        try{
            assert(request.body.name != undefined, 'Missing parameter "name".')
            assert(request.body.password != undefined, 'Missing parameter "password".')
            await UserService.register(request.body);
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
            assert(request.body.poster_path || request.body.description, 'Missing user parameters for updating.')
            sessionId = request.user._id
            userParams = {
                id: request.body.id,
                poster_path: request.body.poster_path,
                description: request.body.description
            }
            await UserService.edit(sessionId, user);
            response.sendStatus(201)
        }
        catch(error){
            if(error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else{
                response.status(500).send(error.toString())
            }
        } 
    }

}
