const mongoose = require('mongoose')

const Activity = new mongoose.Schema({
    activityType: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    like: { type: mongoose.Schema.Types.ObjectId, ref: 'Review.likes' },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Review.comments' }
}, { timestamps: true } )

module.exports = mongoose.model('Activity', Activity)
