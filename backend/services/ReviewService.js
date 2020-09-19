const Review = require('../database/models/Review')
const assert = require('assert')

module.exports = {

    async getReviews(movieId) {
        let reviews = await Review
            .find({ movie: movieId })
            .sort("-createdAt")
            .populate("user", "name")
            .select("text _id")
        reviews = reviews.map(review => {
            return {
                _id: review._id,
                text: review.text,
                username: review.user.name
            }
        })
        return reviews
    },

    async addReview(text, movieId, sessionUserId) {
        const review = new Review({
            text,
            movie: movieId,
            user: sessionUserId
        })
        return review.save()
    },

    async editReview(reviewId, text, sessionUserId) {
        const review = await Review.findById(reviewId)
        assert(review.user.equals(sessionUserId), "User cannot edit another user review.")

        review.text = text

        return review.save()
    },

    async removeReview(reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)
        assert(review.user.equals(sessionUserId), "User cannot remove another user review.")

        return review.remove()
    }

}
