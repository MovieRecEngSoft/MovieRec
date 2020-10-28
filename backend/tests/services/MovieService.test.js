const MovieService = require('../../services/MovieService.js')
const MovieFilter = MovieService.MovieFilter
const PageFilter = MovieService.PageFilter
const assert = require('assert')
const mongoose = require('mongoose')

test('MovieFilter: validate', () => {
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


test('PageFilter: validate', () => {
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

test('PageFilter: size', () => {
    let pageFilter = new PageFilter(1,10)
    expect(pageFilter.skip).toBe(0)
    pageFilter = new PageFilter(2,10)
    expect(pageFilter.skip).toBe(10)
    pageFilter = new PageFilter(2,20)
    expect(pageFilter.skip).toBe(20)
    pageFilter = new PageFilter(3,20)
    expect(pageFilter.skip).toBe(40)
})