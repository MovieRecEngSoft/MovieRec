const mongoose = require('mongoose')

const Movie = new mongoose.Schema({
    title: String
})

module.exports = mongoose.model('Movie', Movie)
