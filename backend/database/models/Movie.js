const mongoose = require('mongoose')

const Movie = new mongoose.Schema({
    title: String,
    poster_path: String,
    release_date: Date,
    overview: String,
    genres: [{ type: mongoose.Types.ObjectId, ref: 'Genre'}],
    companies: [{ type: mongoose.Types.ObjectId, ref: 'Company'}]
})

module.exports = mongoose.model('Movie', Movie)
