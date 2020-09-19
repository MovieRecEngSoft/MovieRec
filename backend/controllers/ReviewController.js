const ReviewService = require('../services/ReviewService')
const assert = require('assert')

module.exports = {

    async getReview(request, response) {
        try {
            assert(request.body.reviewId, 'Missing parameter "reviewId".')

            const reviewId = request.body.reviewId
            const sessionUserId = request.user ? request.user._id : null

            const review = await ReviewService.getReview(reviewId, sessionUserId)

            return response.json(review)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async getReviews(request, response) {
        try {
            assert(request.body.movieId, 'Missing parameter "movieId".')

            const movieId = request.body.movieId
            const sessionUserId = request.user ? request.user._id : null

            const reviews = await ReviewService.getReviews(movieId, sessionUserId)

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
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.text, 'Missing parameter "text".')
            assert(request.body.movieId, 'Missing parameter "movieId".')

            const text = request.body.text
            const movieId = request.body.movieId
            const sessionUserId = request.user._id

            await ReviewService.addReview(text, movieId, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async editReview(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')
            assert(request.body.text, 'Missing parameter "text".')

            const reviewId = request.body.reviewId;
            const text = request.body.text;
            const sessionUserId = request.user._id

            await ReviewService.editReview(reviewId, text, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async removeReview(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')

            const reviewId = request.body.reviewId;
            const sessionUserId = request.user._id

            await ReviewService.removeReview(reviewId, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async toggleLikeReview(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')

            const reviewId = request.body.reviewId;
            const sessionUserId = request.user._id

            await ReviewService.toggleLikeReview(reviewId, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async addComment(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')
            assert(request.body.text, 'Missing parameter "text".')

            const text = request.body.text
            const reviewId = request.body.reviewId
            const sessionUserId = request.user._id

            await ReviewService.addComment(text, reviewId, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async editComment(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')
            assert(request.body.commentId, 'Missing parameter "commentId".')
            assert(request.body.text, 'Missing parameter "text".')

            const reviewId = request.body.reviewId;
            const commentId = request.body.commentId;
            const text = request.body.text;
            const sessionUserId = request.user._id

            await ReviewService.editComment(reviewId, commentId, text, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    },

    async removeComment(request, response) {
        try {
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.body.reviewId, 'Missing parameter "reviewId".')
            assert(request.body.commentId, 'Missing parameter "commentId".')

            const reviewId = request.body.reviewId;
            const commentId = request.body.commentId;
            const sessionUserId = request.user._id

            await ReviewService.removeComment(reviewId, commentId, sessionUserId)

            return response.sendStatus(204)
        } catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    }

}
