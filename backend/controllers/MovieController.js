const assert = require('assert')
const MovieService = require('../services/MovieService')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const SearchParams = MovieService.SearchParams

module.exports = {

    async index(request, response) {
        try{
            let genres = request.query.genres ? request.query.genres.split(' ') : undefined
            
            let movieFilter = new MovieFilter(
                request.query.names ? request.query.names.split(' ') : undefined,
                (genres) ? genres.map((genre) => {return parseInt(genre)}) : undefined,
                request.query.date_gte ? new Date(request.query.date_gte) : undefined,
                request.query.date_lte ? new Date(request.query.date_lte) : undefined,
                request.query.score? parseInt(request.query.score) : undefined
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
    }

}
