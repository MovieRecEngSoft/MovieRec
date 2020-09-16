const MovieService = require('../services/MovieService')

module.exports = {

    async index(request, response) {
        const movies = MovieService.getMovies()
        return response.json(movies)
    }

}
