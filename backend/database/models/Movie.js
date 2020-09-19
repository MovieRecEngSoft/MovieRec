const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const Movie = new mongoose.Schema({
    title: String,
    poster_path: String,
    release_date: Date,
    overview: String,
    genres: [{ type: Number, ref: 'Genre'}],
    id_tmdb: {type: Number, unique: true},
    recommended_movies: [{type: mongoose.Schema.Types.ObjectId , ref: 'Movie'}]
})
Movie.plugin(mongoosePaginate)

module.exports = mongoose.model('Movie', Movie)
