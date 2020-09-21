const Movie = require('../database/models/Movie')
const Review = require('../database/models/Review')
const assert = require('assert')
const dbErrors = require('../database/error/errors.js')
const dbErrorHandler = require('../database/error/handler.js')

const SCORE_MIN = 0
const SCORE_MAX = 10

class MovieFilter {
    constructor(names, genres,date_gte, date_lt, score, userId, moviesIds){
        this.names = names
        this.genres = genres
        this.date_gte = date_gte
        this.date_lt = date_lt
        this.score = score
        this.userId = userId
        this.moviesIds = moviesIds
    }   

    validate(){
        assert(!this.names || typeof this.names === 'string', 'Wrong type of parameter "names".')
        assert(!this.genres || typeof this.genres === 'object', 'Wrong type of parameter "genres".')
        assert(!this.date_lt || typeof this.date_lt === 'object', 'Wrong type of parameter "date".')
        assert(!this.date_gte || typeof this.date_gte === 'object', 'Wrong type of parameter "date".')
        if(this.score){
            assert(typeof this.score === 'number', 'Wrong type of parameter "score".')
            assert(this.score >= SCORE_MIN && this.score <= SCORE_MAX,
                'Parameter "score" must be between ' + SCORE_MIN + ' and ' + SCORE_MAX + '.')
        }
        assert(!this.moviesIds || typeof this.moviesIds === 'object', 'Wrong type of parameter "moviesIds".')
    }
    
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_LIMIT = 10

class PageFilter{
    constructor(page, limit){
        this.page = page ? page : DEFAULT_PAGE 
        this.limit = limit ? limit : DEFAULT_PAGE_LIMIT
    }

    validate(){
        assert(typeof this.page === 'number', 'Wrong type of parameter "page".')
        assert(typeof this.limit === 'number', 'Wrong type of parameter "limit".')
    }

    get skip(){
        return (this.page - 1) * this.limit
    }
}

class SearchParams{
    constructor(movieFilter, pageFilter){
        this.movieFilter = movieFilter ? movieFilter : new MovieFilter()
        this.pageFilter = pageFilter ? pageFilter : new PageFilter()
    }

    validate(){
        this.movieFilter.validate()
        this.pageFilter.validate()
    }
}

function generateRegExp(movieNames){
    let regExpText = '[A-Za-z0-9_]*'
    regExpText += movieNames + '[A-Za-z0-9_]*'
    return new RegExp(regExpText);
}

function generateReviewMatchGroupByMovies(movieIds){
    reviewMatch = {}
    if(movieIds.length > 0)
        reviewMatch.movie = {$in: movieIds}
    return reviewMatch
}

function generateReviewMatchByScore(score){
    reviewMatch = {}
    if(score)
        reviewMatch.averageScore = {$gte: score}
    return reviewMatch
}

function generateReviewMatchByUserAndMovies(userId, moviesIds){
    reviewMatch = {}
    if(userId)
        reviewMatch.user = userId
    if(moviesIds)
        reviewMatch.movie = {$in: moviesIds}
    return reviewMatch
}

async function generateMovieMatch(movieFilter){
    let match = {}
    if(movieFilter.score || movieFilter.userId){
        const reviewBeforGroupMatch = generateReviewMatchByUserAndMovies(movieFilter.userId, movieFilter.moviesIds)
        const reviewMatch = generateReviewMatchByScore(movieFilter.score)
        const reviews = await Review.aggregate([
            {
                $match: reviewBeforGroupMatch
            },
            {
                $group: {
                    _id: '$movie',
                    averageScore: {$avg: "$score"}
                }
            },
            {
                $match: reviewMatch
            }

        ])
        let reviewsIds = []
        for(review of reviews){
            reviewsIds.push(review._id)
        }
        match._id = {$in: reviewsIds}
    }
    else if(movieFilter.moviesIds){
        match._id = {$in: movieFilter.moviesIds}
    }
    
    if(movieFilter.names){
        match.title = {$regex: generateRegExp(movieFilter.names), $options: 'i'}
    }
    if(movieFilter.genres){
        match.genres = {$in: movieFilter.genres}
    }
    if(movieFilter.date_gte || movieFilter.date_lt){
        match.release_date = {}
        if(movieFilter.date_gte)
            match.release_date.$gte = movieFilter.date_gte
        if(movieFilter.date_lt)
            match.release_date.$lt = movieFilter.date_lt
    }
    return match
}

function formatMovie(movie, score){
    return{
        _id: movie._id ,
        title: movie.title ,
        poster_path: movie.poster_path ,
        release_date: movie.release_date ,
        genres: movie.genres_data.map((genre) => {
            return {
                _id: genre._id,
                name: genre.name
            } 
        }),
        score: score ? score : null
    }
}

module.exports = {

    MovieFilter: MovieFilter,
    PageFilter: PageFilter,
    SearchParams: SearchParams,

    async getMovies(searchParams) {
        searchParams.validate()
        const match = await generateMovieMatch(searchParams.movieFilter)
        const movies = await Movie.aggregate([
            {
                $match: match
            },
            {$sort : {release_date : -1}},
            {$skip : searchParams.pageFilter.skip},
            {$limit : searchParams.pageFilter.limit},
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres_data'
                }
            }
        ])
        let moviesIds = []
        for(let movie of movies){
            moviesIds.push(movie._id)
        }
        const matchReview = generateReviewMatchGroupByMovies(moviesIds)
        const reviews = await Review.aggregate([
            {
                $match: matchReview
            },
            {
                $group: {
                    _id: '$movie',
                    averageScore: {$avg: "$score"}
                }
            }
        ])
        let reviewMap = new Map()
        for(let review of reviews){
            reviewMap.set(review._id.toString(), review.averageScore)
        }
        let moviesPopulated = movies.map((movie) =>{
            let score = reviewMap.get(movie._id.toString())
            return formatMovie(movie, score)
        })
        return moviesPopulated
    },

    async getMovie(movieId){
        try{
            const movie = await Movie.findById(movieId)
            return movie
        }
        catch(error){
            try{
                dbErrorHandler.handle(error)
            } 
            catch(error){
                if(error instanceof dbErrors.DBCastError)
                    assert(false, 'Wrong format of parameter "id".')
                else 
                    throw error
            }
        }
        return movie
    } 

}
