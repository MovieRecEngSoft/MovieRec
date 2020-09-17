const mongoose = require('mongoose')

const Genre = new mongoose.Schema({
    _id: Number,
    name: String
})

module.exports = mongoose.model('Genre', Genre)
