const mongoose = require('mongoose')

const databaseUser = 'movierec'
const databasePassword = 'movierecpassword'
const databaseName = 'movierec'
const databaseUrl = `mongodb+srv://${databaseUser}:${databasePassword}@cluster0.gsuuq.mongodb.net/${databaseName}?retryWrites=true&w=majority`

module.exports = {

    async connect() {
        return mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    }

}
