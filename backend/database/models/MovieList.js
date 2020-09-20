const mongoose = require('mongoose')

const MovieList = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: mongoose.Schema.Types.ObjectId , ref: 'Movie'}]
})
MovieList.index({ name: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('MovieList', MovieList)