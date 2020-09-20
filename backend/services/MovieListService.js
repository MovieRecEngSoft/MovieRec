const MovieList = require('../database/models/MovieList.js')

module.exports = {

    async getMovieLists() {
        const movieList = await MovieList.find({})
        return movieList
    }

}
