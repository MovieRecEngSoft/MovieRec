const Activity = require('../database/models/Activity')

const ACTIVITY_TYPES = {
    CREATE_REVIEW: "review",
    COMMENT_REVIEW: "comment",
    LIKE_REVIEW: "like"
}

function formatActivity(activity) {
    const activityData = {
        activityType: activity.activityType,
        userId: activity.user._id,
        username: activity.user.name,
        userImgUrl: activity.user.img_path
    }
    if (activity.activityType === ACTIVITY_TYPES.CREATE_REVIEW || activity.activityType === ACTIVITY_TYPES.LIKE_REVIEW) {
        activityData.text = activity.review.text
    } else if (activity.activityType === ACTIVITY_TYPES.COMMENT_REVIEW) {
        const comment = activity.review.comments.find(comment => comment._id.equals(activity.comment))
        activityData.text = comment.text
    }
    return activityData
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
    },

    async getUserActivities(userId) {
        let activities = await Activity
            .find({ user: userId })
            .populate("user", "name img_path")
            .populate("review.comments", "text")
            .populate("review", "text comments")
            .sort("-createdAt")
        activities = activities.map(formatActivity)
        return activities
    },

    async getUsersActivities(usersIds) {
        let activities = await Activity
            .find()
            .where('user')
            .in(usersIds)
            .populate("user", "name img_path")
            .populate("review.comments", "text")
            .populate("review", "text comments")
            .sort("-createdAt")
        activities = activities.map(formatActivity)
        return activities
    }

}
