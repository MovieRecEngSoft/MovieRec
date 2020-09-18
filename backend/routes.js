const express = require('express')

const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')
const ReviewController = require('./controllers/ReviewController')

const routes = express.Router()

routes.get('/movies', MovieController.index)

routes.post('/review/add', ReviewController.addReview)
routes.post('/review/edit', ReviewController.editReview)
routes.post('/review/remove', ReviewController.removeReview)
routes.get('/reviews', ReviewController.getReviews)

routes.post('/user', UserController.register)

module.exports = routes
