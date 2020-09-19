const ReviewService = require('../services/ReviewService')
const assert = require('assert')

module.exports = {

    async getReviews(request, response) {
        try {
            assert(request.body.movieId, 'Missing "movieId" parameter')

            const movieId = request.body.movieId

            const reviews = await ReviewService.getReviews(movieId)

            return response.json(reviews)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async addReview(request, response) {
        try {
            assert(request.body.text, 'Missing "text" parameter')
            assert(request.body.movieId, 'Missing "movieId" parameter')

            const text = request.body.text
            const movieId = request.body.movieId
            const userId = request.user._id

            await ReviewService.addReview(text, movieId, userId)

            return response.sendStatus(200)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async editReview(request, response) {
        return response.sendStatus(200)
    },

    async removeReview(request, response) {
        return response.sendStatus(200)
    }

}
