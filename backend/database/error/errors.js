class DBOperationError extends Error{
    constructor(message){
        super(message)
        this.name = "DBOperationError"
    }
}

class DBDuplicatedKeyError extends DBOperationError{
    constructor(message){
        super(message)
        this.name = "DBDuplicatedKeyError"
    }
}

module.exports = {
    DBOperationError: DBOperationError,
    DBDuplicatedKeyError: DBDuplicatedKeyError
}