const Movie = require('../database/models/Movie')
const Review = require('../database/models/Review')
const assert = require('assert')
const { compareSync } = require('bcrypt')

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

        // id = {_id: { $in : ids}}
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
        // const movies = await Movie.aggregate([
        //     {
        //         $match: {
        //             _id: {$in: reviewsIds}
        //         }
        //     },
        //     {
        //         $lookup:
        //            {
        //               from: "members",
        //               localField: "enrollmentlist",
        //               foreignField: "name",
        //               as: "enrollee_info"
        //           }
        //      }
        // ])
        // const movies = await Movie.paginate({}, searchParams.pageFilter)
        const movies = await Movie.findById(reviewsIds[0]).exec()
        return movies
    }

}
