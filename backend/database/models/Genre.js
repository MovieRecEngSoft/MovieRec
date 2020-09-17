const mongoose = require('mongoose')

const Genre = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Genre', Genre)
