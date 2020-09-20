const assert = require('assert')
const MovieService = require('../services/MovieService')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const SearchParams = MovieService.SearchParams

module.exports = {

    async getMovies(request, response) {
        try{
            let genres = request.query.genres ? request.query.genres.split(' ') : undefined
            let movieFilter = new MovieFilter(
                request.query.names ? request.query.names : undefined,
                (genres) ? genres.map((genre) => {return parseInt(genre)}) : undefined,
                request.query.date_gte ? new Date(request.query.date_gte) : undefined,
                request.query.date_lt ? new Date(request.query.date_lt) : undefined,
                request.query.score? parseInt(request.query.score) : undefined,
                undefined
            ) 
            let pageFilter = new PageFilter(
                request.query.page? parseInt(request.query.page): undefined,
                request.query.limit? parseInt(request.query.limit): undefined
            )
            let searchParams = new SearchParams(movieFilter, pageFilter)
            const movies = await MovieService.getMovies(searchParams)
            response.json(movies)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getMovie(request, response){
        try{
            assert(request.query.id, 'Missing parameter "id".')
            const movie = await MovieService.getMovie(request.query.id)
            if(movie)
                response.json(movie)
            else
                response.sendStatus(404)
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
