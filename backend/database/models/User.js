const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, unique: true},
    password: String,
    description: String,
    img_path: String,
    recommended_movies: [{type: mongoose.Schema.Types.ObjectId , ref: 'Movie'}]
})

module.exports = mongoose.model('User', User)