const express = require('express')

const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')
const ReviewController = require('./controllers/ReviewController')

const authenticator = require('./authenticator.js')
const routes = express.Router()

function checkAuthentication(request, response, next){
    if(!request.isAuthenticated()){
        response.sendStatus(401)
    }
    else {
        next()
    }
}

routes.post('/login', authenticator.authenticate('local'),
    (request, response) => {response.sendStatus(302)}
)

routes.post('/logout', (request, response) => {
    if(request.isAuthenticated()){
        request.logOut()
        response.sendStatus(200)
    }
    else{
        response.sendStatus(205)
    }
})

routes.get('/movies', MovieController.index)

routes.get('/review', ReviewController.getReview)
routes.post('/review', checkAuthentication, ReviewController.addReview)
routes.patch('/review', checkAuthentication, ReviewController.editReview)
routes.delete('/review', checkAuthentication, ReviewController.removeReview)
routes.post('/review/like', checkAuthentication, ReviewController.toggleLikeReview)
routes.post('/review/comment', checkAuthentication, ReviewController.addComment)
routes.patch('/review/comment', checkAuthentication, ReviewController.editComment)
routes.delete('/review/comment', checkAuthentication, ReviewController.removeComment)
routes.get('/reviews', ReviewController.getReviews)

routes.post('/user', UserController.register)

module.exports = routes
