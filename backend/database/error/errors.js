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

class DBCastError extends DBOperationError{
    constructor(message){
        super(message)
        this.name = "DBCastError"
    }
}

module.exports = {
    DBOperationError: DBOperationError,
    DBDuplicatedKeyError: DBDuplicatedKeyError,
    DBCastError: DBCastError
}