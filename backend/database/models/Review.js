const mongoose = require('mongoose')

const Review = new mongoose.Schema({
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
}, { timestamps: true } )

module.exports = mongoose.model('Review', Review)
