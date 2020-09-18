const bcrypt = require('bcrypt')

const SALT = 10

module.exports = {

    async generateHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT))
    },

    async compare(password, encryptedPassword){
        return bcrypt.compareSync(password, encryptedPassword)
    }

}