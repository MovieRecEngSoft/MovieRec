const UserService = require('../services/UserService')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')

module.exports = {

    async register(request, response) {
        try{
            assert(request.body.user !== undefined)
            assert(request.body.user.name != undefined)
            assert(request.body.user.password != undefined)
            await UserService.register(request.body.user);
            response.sendStatus(201)
        }
        catch(error){
            if(error instanceof assert.AssertionError)
                response.sendStatus(400)
            else if(error instanceof dbErrors.DBDuplicatedKeyError)
                response.sendStatus(409)
            else{
                response.sendStatus(500)
            }
        } 
    }

}
