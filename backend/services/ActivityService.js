const Activity = require('../database/models/Activity')
const { removeReview } = require('./ReviewService')

const ACTIVITY_TYPES = {
    CREATE_REVIEW: "review",
    COMMENT_REVIEW: "comment",
    LIKE_REVIEW: "like"
}

module.exports = {

    async createReviewActivity(reviewId, userId) {
        const activity = new Activity({
            activityType: ACTIVITY_TYPES.CREATE_REVIEW,
            review: reviewId,
            user: userId
        })
        return activity.save()
    },

    async createCommentActivity(reviewId, commentId, userId) {
        const activity = new Activity({
            activityType: ACTIVITY_TYPES.COMMENT_REVIEW,
            review: reviewId,
            comment: commentId,
            user: userId
        })
        return activity.save()
    },

    async createLikeActivity(reviewId, likeId, userId) {
        const activity = new Activity({
            activityType: ACTIVITY_TYPES.LIKE_REVIEW,
            review: reviewId,
            like: likeId,
            user: userId
        })
        return activity.save()
    },

    async removeReviewActivity(reviewId) {
        return Activity.deleteMany({ review: reviewId })
    },

    async removeCommentActivity(reviewId, commentId) {
        return Activity.deleteMany({ review: reviewId, comment: commentId })
    },

    async removeLikeActivity(reviewId, likeId) {
        return Activity.deleteMany({ review: reviewId, like: likeId })
    }

}
