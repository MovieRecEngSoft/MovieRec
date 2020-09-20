const Genre = require('../database/models/Genre')

module.exports = {

    async getGenres() {
        const genres = await Genre.find({})
        return genres
    }

}
