const assert = require('assert')
const MovieService = require('../services/MovieService')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const SearchParams = MovieService.SearchParams

module.exports = {

    async index(request, response) {
        try{
            let movieFilter = (request.query.movieFilter) ?
                new MovieFilter(request.query.movieFilter.name,
                                request.query.movieFilter.genres,
                                request.query.movieFilter.date,
                                request.query.movieFilter.score) :
                new MovieFilter()
            let pageFilter = (request.query.pageFilter) ?
                new PageFilter(request.query.pageFilter.page, request.query.pageFilter.limit) :
                new PageFilter()
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
