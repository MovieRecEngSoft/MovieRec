const mongoose = require('mongoose')

const Movie = new mongoose.Schema({
    title: String,
    poster_path: String,
    release_date: Date,
    overview: String,
    genres: [{ type: Number, ref: 'Genre'}],
    keywords: [{ type: Number, ref: 'Keyword'}],
    recommended_movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})

module.exports = mongoose.model('Movie', Movie)
