const assert = require('assert')
const MovieService = require('../services/MovieService')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const SearchParams = MovieService.SearchParams

module.exports = {

    async index(request, response) {
        try{
            let movieFilter = (request.body.movieFilter) ? 
                new MovieFilter(request.body.movieFilter.name,
                                request.body.movieFilter.genres,
                                request.body.movieFilter.date,
                                request.body.movieFilter.score) :
                new MovieFilter()
            let pageFilter = (request.body.pageFilter) ? 
                new PageFilter(request.body.pageFilter.page, request.body.pageFilter.limit) :
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
