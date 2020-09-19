const mongoose = require('mongoose')

const Review = new mongoose.Schema({
    text: String,
    score: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String
    }]
}, { timestamps: true } )

module.exports = mongoose.model('Review', Review)
