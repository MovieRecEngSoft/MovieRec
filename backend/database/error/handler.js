const errors = require('./errors.js')

module.exports = {
    handle(error){
        if(error.name === 'MongoError' && error.code === 11000)
            throw new errors.DBDuplicatedKeyError(error.message)
        else
            throw error
    }
}