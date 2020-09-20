const Review = require('../database/models/Review')
const assert = require('assert')
const ActivityService = require('./ActivityService')

function formatReview(review, sessionUserId = null) {
    return {
        _id: review._id,
        text: review.text,
        score: review.score,
        userId: review.user._id,
        username: review.user.name,
        userImgUrl: review.user.img_path,
        likes: review.likes.length,
        userLiked: !!(sessionUserId && review.likes.indexOf(sessionUserId) !== -1)
    }
}

function fixDecimalPlaces(number) {
    return parseFloat(number.toFixed(1))
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
                userImgUrl: comment.user.img_path,
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
        reviews = reviews
            .map(review => formatReview(review, sessionUserId))
            // Sort descending by number of likes.
            .sort((a, b) => b.likes - a.likes)
        return reviews
    },

    async addReview(text, score, movieId, sessionUserId) {
        assert(typeof score === "number", 'The parameter "score" must be numeric.')
        assert(score >= 0 && score <= 10, 'The parameter "score" msut be between 0 and 10.')
        score = fixDecimalPlaces(score)
        const review = new Review({
            text,
            score,
            movie: movieId,
            user: sessionUserId
        })

        await review.save()
        return ActivityService.createReviewActivity(review._id, sessionUserId)
    },

    async editReview(reviewId, text, score, sessionUserId) {
        const review = await Review.findById(reviewId)
        assert(review.user.equals(sessionUserId), "User cannot edit another user review.")
        assert(typeof score === "number", 'The parameter "score" must be numeric.')
        assert(score >= 0 && score <= 10, 'The parameter "score" msut be between 0 and 10.')
        score = fixDecimalPlaces(score)

        review.text = text
        review.score = score

        return review.save()
    },

    async removeReview(reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)
        assert(review.user.equals(sessionUserId), "User cannot remove another user review.")

        await ActivityService.removeReviewActivity(reviewId)
        return review.remove()
    },

    async toggleLikeReview(reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)
        let likeAdded = false
        let likeId

        const likeIndex = review.likes.indexOf(sessionUserId)
        if (likeIndex === -1) {
            likeAdded = true
            review.likes.push(sessionUserId)
            likeId = review.likes[review.likes.length - 1]._id
        } else {
            likeId = review.likes[likeIndex]._id
            review.likes.splice(likeIndex, 1)
        }

        await review.save()
        if (likeAdded) {
            return ActivityService.createLikeActivity(reviewId, likeId, sessionUserId)
        } else {
            return ActivityService.removeLikeActivity(reviewId, likeId)
        }
    },

    async addComment(text, reviewId, sessionUserId) {
        const review = await Review.findById(reviewId)

        review.comments.push({
            text,
            user: sessionUserId
        })

        const commentId = review.comments[review.comments.length - 1]._id

        await review.save()
        return ActivityService.createCommentActivity(reviewId, commentId, sessionUserId)
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

        await review.save()
        return ActivityService.removeCommentActivity(reviewId, commentId)
    },

}
