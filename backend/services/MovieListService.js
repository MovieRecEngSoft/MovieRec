const MovieList = require('../database/models/MovieList.js')
const Movie = require('../database/models/Movie.js')
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

    async getMovieList(sesionUserId, name) {
        assert(typeof name === 'string', 'Wrong type of parameter "name".')
        let filter = {
            user: sesionUserId,
            name: name
        }
        const movieList = await MovieList.find(filter)
        return movieList
    }

}
