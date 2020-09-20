const Movie = require('../database/models/Movie')
const Review = require('../database/models/Review')
const assert = require('assert')

class MovieFilter {
    constructor(names, genres, date, score){
        this.names = names
        this.genres = genres
        this.date = date
        this.score = score ? score : -1
    }   

    validate(){
        assert(!names || typeof this.names === 'object', 'Wrong type of parameter "names".')
        assert(!genres || typeof this.genres === 'object', 'Wrong type of parameter "genres".')
        assert(!date || typeof this.date === 'object', 'Wrong type of parameter "date".')
        assert(typeof this.score === 'number', 'Wrong type of parameter "score".')
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

async function generateMatch(movieFilter){
    let match = {}
    const reviews = await Review.aggregate([
        {
            $group: {
              _id: '$movie',
              averageScore: {$avg: "$score"}
            }
        },
        {
            $match: {
                averageScore: {$gt: 8}
            }
        }

    ])
    let reviewsIds = []
    for(review of reviews){
        reviewsIds.push(review._id)
    }
    console.log(reviewsIds)
    match._id = {$in: reviewsIds}
    if(movieFilter.names){
        match.title = {$regex: generateRegExp(movieFilter.names), $options: 'i'}
    }
    console.log(match)
    return match
}

module.exports = {

    MovieFilter: MovieFilter,
    PageFilter: PageFilter,
    SearchParams: SearchParams,

    async getMovies(searchParams) {
        const match = await generateMatch(searchParams.movieFilter)
        const movies = await Movie.aggregate([
            {
                $match: match
            }
        ])
        // const movies = await Movie.paginate({}, searchParams.pageFilter)
        // const movies = await Movie.findById(reviewsIds[0]).exec()
        return movies
    }

}
