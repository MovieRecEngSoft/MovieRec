const mongoose = require('mongoose')

const Image = new mongoose.Schema({
    binData: Buffer,
    extesion: String
})

module.exports = mongoose.model('Image', Image)