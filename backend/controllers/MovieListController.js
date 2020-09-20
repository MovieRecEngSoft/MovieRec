const MovieListService = require('../services/MovieListService.js')
const assert = require('assert')
const PageFilter = require('../services/MovieService.js').PageFilter

module.exports = {

    async addMovieList(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.name, 'Missing parameter "name".')
            const userId = request.user._id
            await MovieListService.addMovieList(userId, request.body.name)
            response.sendStatus(204)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async deleteMovieList(request, response){
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.name, 'Missing parameter "name".')
            const userId = request.user._id
            await MovieListService.deleteMovieList(userId, request.body.name)
            response.sendStatus(204)
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
            response.sendStatus(204)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async deleteMovieFromMovieList(request, response){
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.name, 'Missing parameter "name".')
            assert(request.body.movieId, 'Missing parameter "movieId".')
            const userId = request.user._id
            await MovieListService.deleteMovieFromMovieList(userId, request.body.name, request.body.movieId)
            response.sendStatus(204)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getMovieLists(request, response){
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            const userId = request.user._id
            const movieLists = await MovieListService.getMovieLists(userId)
            response.json(movieLists)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getMovieListMovies(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.query.name, 'Missing parameter "name".')
            const userId = request.user._id
            let pageFilter = new PageFilter(
                request.query.page? parseInt(request.query.page): undefined,
                request.query.limit? parseInt(request.query.limit): undefined
            )
            const movies = await MovieListService.getMovieListMovies(userId, request.query.name, pageFilter)
            response.json(movies)
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
