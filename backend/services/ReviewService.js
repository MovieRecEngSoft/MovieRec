const Review = require('../database/models/Review')

module.exports = {

    async getReviews(movieId) {
        let reviews = await Review
            .find({ movie: movieId })
            .sort("-createdAt")
            .populate("user", "name")
            .select("text")
        reviews = reviews.map(review => {
            return {
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
    }

}
