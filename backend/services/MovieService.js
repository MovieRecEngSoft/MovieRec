const Movie = require('../database/models/Movie')

module.exports = {

    async getMovies() {
        const movies = await Movie.find({})
        return movies
    }

}
