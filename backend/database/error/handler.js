const errors = require('./errors.js')

module.exports = {
    handle(error){
        console.log(error.name)
        console.log(error.code)
        if(error.name === 'MongoError' && error.code === 11000){
            console.log("OPA")
            throw new errors.DBDuplicatedKeyError(error.message)
        }
        else
            throw error
    }
}