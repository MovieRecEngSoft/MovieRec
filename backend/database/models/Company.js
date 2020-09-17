const mongoose = require('mongoose')

const Company = new mongoose.Schema({
    _id: Number,
    name: String
})

module.exports = mongoose.model('Company', Company)