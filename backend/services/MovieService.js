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
        assert(!this.names || typeof this.names === 'object', 'Wrong type of parameter "names".')
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
        assert(typeof this.page === 'string', 'Wrong type of parameter "pagefilter.page".')
        assert(typeof this.limit === 'string', 'Wrong type of parameter "pagefilter.limit".')
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
}

function generateRegExp(movieNames){
    let regExpText = '[A-Za-z0-9_]*'
    for(name of movieNames){
        regExpText += name + '[A-Za-z0-9_]*'
    }
    console.log(regExpText)
    return new RegExp(regExpText);
}

async function generateReviewMatch(score){
    reviewMatch = {}
    if(score)
        reviewMatch.score = {$gte: score}
    return reviewMatch
}

async function generateMovieMatch(movieFilter){
    const reviewMatch = await generateReviewMatch(movieFilter.score)
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
    let match = {}
    if(reviewsIds.length > 0)
        match._id = {$in: reviewsIds}
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
        const match = await generateMovieMatch(searchParams.movieFilter)
        const movies = await Movie.aggregate([
            {
                $match: match
            },
            {$sort : {release_date : -1}},
            {$skip : searchParams.pageFilter.skip},
            {$limit : searchParams.pageFilter.limit}
        ])
        let moviesPopulated = []
        for(let movieDoc of movies){
            let reviews = await Review.find({movie: movieDoc._id}).exec()
            let averageScore = 0
            if(reviews.length > 0){
                for(let review of reviews){
                    averageScore += review.score
                }
                averageScore /= reviews.length
            }
            else{
                averageScore = null
            }
            moviesPopulated.push({
                _id: movieDoc._id ,
                title: movieDoc.title ,
                poster_path: movieDoc.poster_path ,
                release_date: movieDoc.release_date ,
                overview: movieDoc.overview ,
                genres: movieDoc.genres ,
                id_tmdb: movieDoc.id_tmdb ,
                recommended_movies: movieDoc.recommended_movies,
                score: averageScore 
            })
        }

        return moviesPopulated
    }

}
