const MovieService = require('../../services/MovieService.js')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const assert = require('assert')
const mongoose = require('mongoose')
const Movie = require('../../database/models/Movie')

jest.mock('../../database/models/Movie')

test('MovieService: MovieFilter: validate', () => {
    //Default parameters
    let movieFilter = new MovieFilter()
    expect(() => movieFilter.validate()).not.toThrow()

    //Common parameters
    movieFilter = new MovieFilter(
        "Toy Story", [12, 16], 
        new Date(2001), new Date(2011), 
        8, mongoose.Types.ObjectId(),
        [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
    )
    expect(() => movieFilter.validate()).not.toThrow()

    //Invalid parameters
    movieFilter = new MovieFilter()
    movieFilter.names = 1
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.genres = 16
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.date_lt = 2001
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.date_gte = 2011
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.score = movieFilter.getMinScore() - 1
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.score = movieFilter.getMaxScore() + 1
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.userId = 12
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
    movieFilter = new MovieFilter()
    movieFilter.moviesIds = mongoose.Types.ObjectId()
    expect(() => movieFilter.validate()).toThrow(assert.AssertionError)
})


test('MovieService: PageFilter: validate', () => {
    //Default parameters
    let pageFilter = new PageFilter()
    expect(() => pageFilter.validate()).not.toThrow()
    pageFilter = new PageFilter(undefined, 10)
    expect(() => pageFilter.validate()).not.toThrow()
    pageFilter = new PageFilter(1, undefined)
    expect(() => pageFilter.validate()).not.toThrow()

    //Common parameters
    pageFilter = new PageFilter(15, 20)
    expect(() => pageFilter.validate()).not.toThrow()

    //Invalid parameters
    pageFilter = new PageFilter('15', 20)
    expect(() => pageFilter.validate()).toThrow(assert.AssertionError)
    pageFilter = new PageFilter(15, '20')
    expect(() => pageFilter.validate()).toThrow(assert.AssertionError)
    pageFilter = new PageFilter(-15, 20)
    expect(() => pageFilter.validate()).toThrow(assert.AssertionError)
    pageFilter = new PageFilter(15, -20)
    expect(() => pageFilter.validate()).toThrow(assert.AssertionError)
})

test('MovieService: PageFilter: size', () => {
    let pageFilter = new PageFilter(1,10)
    expect(pageFilter.skip).toBe(0)
    pageFilter = new PageFilter(2,10)
    expect(pageFilter.skip).toBe(10)
    pageFilter = new PageFilter(2,20)
    expect(pageFilter.skip).toBe(20)
    pageFilter = new PageFilter(3,20)
    expect(pageFilter.skip).toBe(40)
})

test('MovieService: getMovie', async () => {
    const movieId = mongoose.Types.ObjectId()
    const title = 'Toy Story'
    const overview = 'Good'
    const genres = [12, 16]
    const poster_path = '/axzklueuxhkfnzlxYsSXJ'
    const release_date = '2010-06-16T00:00:00.000Z'
    const recommended_movies = [
        "5f66e4585d908d3aa007b7a6",
        "5f66e4595d908d3aa0080f62",
        "5f66e45a5d908d3aa0082323",
        "5f66e45a5d908d3aa0082329",
        "5f66e45a5d908d3aa0081e8e",
        "5f66e4595d908d3aa007d6ba",
        "5f66e4595d908d3aa007d7f4",
        "5f66e45a5d908d3aa00824bf",
        "5f66e45a5d908d3aa008529b"
    ]
    const _doc = {
        _id: movieId,
        title: title,
        poster_path: poster_path,
        release_date: release_date,
        overview: overview,
        genres: genres,
        recommended_movies: recommended_movies
    }
    const finderMock = id => {
        if (id === movieId) {
            return _doc;
        }
        else{
            return undefined
        }
    }
    Movie.findById.mockImplementation(finderMock);
    let movie = await MovieService.getMovie(movieId)
    expect(movie._id).toBe(movie._id)
    expect(movie.title).toBe(movie.title)
    expect(movie.poster_path).toBe(movie.poster_path)
    expect(movie.release_date).toBe(movie.release_date)
    expect(movie.overview).toBe(movie.overview)
    expect(movie.genres).toBe(movie.genres)
    expect(movie.recommended_movies).toBe(movie.recommended_movies)

    movie = await MovieService.getMovie(mongoose.Types.ObjectId())
    expect(movie).toBe(undefined)
})