const Movie = require('../database/models/Movie')
const assert = require('assert')

class MovieFilter {
    constructor(name, genres, date, score){
        this.name = name
        this.genres = genres
        this.date = date
        this.score = score
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
    constructor(filterParams, pageFilter){
        this.filterParams = filterParams ? filterParams : new FilterParams()
        this.pageFilter = pageFilter ? pageFilter : new PageFilter()
    }
}

module.exports = {

    MovieFilter: MovieFilter,
    PageFilter: PageFilter,
    SearchParams: SearchParams,

    async getMovies(searchParams) {
        const movies = await Movie.paginate({}, searchParams.pageFilter)
        return movies
    }

}
