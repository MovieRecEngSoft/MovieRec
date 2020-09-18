const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, unique: true},
    password: String,
    description: String,
    img_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'}
})

module.exports = mongoose.model('User', User)