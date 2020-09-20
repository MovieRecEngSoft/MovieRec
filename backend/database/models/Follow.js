const mongoose = require('mongoose')

const Follow = new mongoose.Schema({
    userFollowing: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    userFollowed: {type: mongoose.Schema.Types.ObjectId , ref: 'User'}
})

module.exports = mongoose.model('Follow', Follow)
