const MovieListService = require('../services/MovieListService.js')
const assert = require('assert')

module.exports = {

    async addMovieList(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.name, 'Missing parameter "name".')
            const userId = request.user._id
            await MovieListService.addMovieList(userId, request.body.name)
            return response.sendStatus(204)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async addMovieToMovieList(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.name, 'Missing parameter "name".')
            assert(request.body.movieId, 'Missing parameter "movieId".')
            const userId = request.user._id
            await MovieListService.addMovieToMovieList(userId, request.body.name, request.body.movieId)
            return response.sendStatus(204)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getMovieList(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.query.name, 'Missing parameter "name".')
            const userId = request.user._id
            const movieList = await MovieListService.getMovieList(userId, request.query.name)
            response.json(movieList)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    }

}
