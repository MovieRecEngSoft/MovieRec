const errors = require('./errors.js')

module.exports = {
    handle(error){
        if(error.name === 'MongoError' && error.code === 11000){
            throw new errors.DBDuplicatedKeyError(error.message)
        }
        else if(error.name === 'CastError'){
            throw new errors.DBCastError(error.message)
        }
        else{
            throw error
        }
    }
}