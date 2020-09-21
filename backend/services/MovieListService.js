const MovieList = require('../database/models/MovieList.js')
const Movie = require('../database/models/Movie.js')
const MovieService = require('../services/MovieService.js')
const MovieFilter = MovieService.MovieFilter
const SearchParams = MovieService.SearchParams

const assert = require('assert')

module.exports = {

    async addMovieList(sesionUserId, name) {
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        const movieList = new MovieList({
            name: name,
            user: sesionUserId,
            movies: []
        })
        await movieList.save()
    },

    async deleteMovieList(sesionUserId, name){
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        let filter = {
            user: sesionUserId,
            name: name
        }
        let status = await MovieList.deleteOne(filter)
        assert(status.deletedCount === 1, 'Movie list ' + name + ' does not exist.')
    },

    async deleteMovieLists(sesionUserId){
        let filter = {
            user: sesionUserId
        }
        await MovieList.deleteMany(filter)
    },

    async addMovieToMovieList(sesionUserId, name, movieId) {
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        const movie = await Movie.findById(movieId)
        assert(movie, 'Invalid "movieId".')
        let movieList = await MovieList.findOne({
            user: sesionUserId,
            name: name,
            movies: movieId
        })
        assert(!movieList, 'Movie list ' + name + ' already contains this movie.')
        movieList = await MovieList.findOne({
            user: sesionUserId,
            name: name
        })
        assert(movieList, 'Movie list ' + name + ' does not exist.')
        movieList.movies.push(movieId)
        await movieList.save()
    },

    async deleteMovieFromMovieList(sesionUserId, name, movieId){
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        let filter = {
            user: sesionUserId,
            name: name
        }
        let status = await MovieList.updateOne(filter, {$pullAll: {movies: [movieId]}})
        assert(status.nModified === 1, 'Movie list ' + name + ' does not exist.')
    },

    async getMovieLists(sesionUserId) {
        let filter = {
            user: sesionUserId
        }
        const movieLists = await MovieList.find(filter)
        return movieLists
    },

    async getMovieListMovies(sesionUserId, name, pageFilter) {
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        let filter = {
            user: sesionUserId,
            name: name
        }
        const movieList = await MovieList.findOne(filter)
        assert(movieList, 'Movie list ' + name + ' does not exist.')
        let movies = []
        if(movieList.movies.length > 0){
            let movieFilter = new MovieFilter(
                undefined, undefined, undefined, undefined, undefined,
                undefined, movieList.movies
            )
            let searchParams = new SearchParams(movieFilter, pageFilter)
            movies = await MovieService.getMovies(searchParams)
        }
        return movies;
    }

}
