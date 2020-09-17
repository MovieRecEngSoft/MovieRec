const mongoose = require('mongoose')

const Movie = new mongoose.Schema({
    title: String,
    poster_path: String,
    release_date: Date,
    overview: String,
    genres: [{ type: Number, ref: 'Genre'}]
})

module.exports = mongoose.model('Movie', Movie)
