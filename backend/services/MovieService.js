const Movie = require('../database/models/Movie')
const Review = require('../database/models/Review')
const assert = require('assert')

class MovieFilter {
    constructor(names, genres,date_gte, date_lte, score){
        this.names = names
        this.genres = genres
        this.date_gte = date_gte
        this.date_lte = date_lte
        this.score = score
    }   

    validate(){
        assert(!this.names || typeof this.names === 'string', 'Wrong type of parameter "names".')
        assert(!this.genres || typeof this.genres === 'object', 'Wrong type of parameter "genres".')
        assert(!this.date || typeof this.date_lte === 'object', 'Wrong type of parameter "date".')
        assert(!this.date || typeof this.date_gte === 'object', 'Wrong type of parameter "date".')
        assert(!this.score || typeof this.score === 'number', 'Wrong type of parameter "score".')
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

function generateReviewMatchByMovies(movieIds){
    reviewMatch = {}
    if(movieIds.length > 0)
        reviewMatch.score = {$in: movieIds}
    return reviewMatch
}

function generateReviewMatchByScore(score){
    reviewMatch = {}
    if(score)
        reviewMatch.score = {$gte: score}
    return reviewMatch
}

async function generateMovieMatch(movieFilter){
    let match = {}
    if(movieFilter.score){
        const reviewMatch = generateReviewMatchByScore(movieFilter.score)
        const reviews = await Review.aggregate([
            {
                $group: {
                _id: '$movie',
                averageScore: {$avg: "$score"}
                }
            },
            {
                $match: {
                    averageScore: reviewMatch
                }
            }

        ])
        let reviewsIds = []
        for(review of reviews){
            reviewsIds.push(review._id)
        }
        match._id = {$in: reviewsIds}
    }
    
    if(movieFilter.names){
        match.title = {$regex: generateRegExp(movieFilter.names), $options: 'i'}
    }
    if(movieFilter.genres){
        match.genres = {$in: movieFilter.genres}
    }
    if(movieFilter.date_gte || movieFilter.date_lte){
        match.date = {}
        if(movieFilter.date_gte)
            match.date.$gte = movieFilter.date_gte
        if(movieFilter.date_lte)
            match.date.$lte = movieFilter.date_lte
    }
    return match
}

module.exports = {

    MovieFilter: MovieFilter,
    PageFilter: PageFilter,
    SearchParams: SearchParams,

    async getMovies(searchParams) {
        searchParams.validate()
        const match = await generateMovieMatch(searchParams.movieFilter)
        console.log(match)
        const movies = await Movie.aggregate([
            {
                $match: match
            },
            {$sort : {release_date : -1}},
            {$skip : searchParams.pageFilter.skip},
            {$limit : searchParams.pageFilter.limit}
        ])

        let moviesIds = []
        for(let movie of movies){
            moviesIds.push(movie._id)
        }
        const matchReview = generateReviewMatchByMovies(moviesIds)
        const reviews = await Review.aggregate([
            {
                $match: {
                    movie: matchReview
                }
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
            reviewMap.set(review._id, review.averageScore)
        }
        let moviesPopulated = movies.map((movie) =>{
            let score = reviewMap.get(movie._id)
            return{
                _id: movie._id ,
                title: movie.title ,
                poster_path: movie.poster_path ,
                release_date: movie.release_date ,
                overview: movie.overview ,
                genres: movie.genres ,
                id_tmdb: movie.id_tmdb ,
                recommended_movies: movie.recommended_movies,
                score: score ? score : null
            }
        })

        return moviesPopulated
    }

}
