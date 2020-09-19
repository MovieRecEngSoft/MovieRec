const UserService = require('../services/UserService')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')

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
    }

}
