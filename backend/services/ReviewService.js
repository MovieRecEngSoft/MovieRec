const Review = require('../database/models/Review')
const assert = require('assert')

function formatReview(review, sessionUserId = null) {
    return {
        _id: review._id,
        text: review.text,
        username: review.user.name,
        likes: review.likes.length,
        userLiked: !!(sessionUserId && review.likes.indexOf(sessionUserId) !== -1)
    }
}

module.exports = {

    async getReview(reviewId, sessionUserId) {
        let review = await Review
            .findById(reviewId)
            .populate("user", "name")
            .populate("comments.user", "name")
        const comments = review.comments.map(comment => {
            return {
                _id: comment._id,
                username: comment.user.name,
                text: comment.text
            }
        })
        review = formatReview(review, sessionUserId)
        review.comments = comments
        return review
    },

    async getReviews(movieId, sessionUserId) {
        let reviews = await Review
            .find({ movie: movieId })
            .populate("user", "name")
            .select("text _id likes")
        reviews = reviews
            .map(review => formatReview(review, sessionUserId))
            // Sort descending by number of likes.
            .sort((a, b) => b.likes - a.likes)
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
    },

    async toggleLikeReview(reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)

        const likeIndex = review.likes.indexOf(sessionUserId)
        if (likeIndex === -1) {
            review.likes.push(sessionUserId)
        } else {
            review.likes.splice(likeIndex, 1)
        }

        return review.save()
    },

    async addComment(text, reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)

        review.comments.push({
            text,
            user: sessionUserId
        })

        return review.save()
    },

    async editComment(reviewId, commentId, text, sessionUserId) {
        const review = await Review.findById(reviewId)
        const comment = review.comments.find(comment => comment._id.equals(commentId))
        assert(comment, "There's no comment with the given id.")
        assert(comment.user.equals(sessionUserId), "User cannot edit another user comment.")

        comment.text = text

        return review.save()
    },

    async removeComment(reviewId, commentId, sessionUserId) {
        const review = await Review.findById(reviewId)
        const comment = review.comments.find(comment => comment._id.equals(commentId))
        assert(comment, "There's no comment with the given id.")
        assert(comment.user.equals(sessionUserId), "User cannot remove another user comment.")

        const commentIndex = review.comments.indexOf(comment)
        review.comments.splice(commentIndex, 1)

        return review.save()
    },

}
