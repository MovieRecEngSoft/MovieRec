const MovieService = require('../services/MovieService')

module.exports = {

    async index(request, response) {
        const movies = await MovieService.getMovies()
        return response.json(movies)
    }

}
