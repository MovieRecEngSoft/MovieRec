const mongoose = require('mongoose')

const Keyword = new mongoose.Schema({
    _id: Number,
    name: String
})

module.exports = mongoose.model('Keyword', Keyword)