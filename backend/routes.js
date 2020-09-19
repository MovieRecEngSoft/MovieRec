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

routes.post('/review/add', checkAuthentication, ReviewController.addReview)
routes.post('/review/edit', checkAuthentication, ReviewController.editReview)
routes.post('/review/remove', checkAuthentication, ReviewController.removeReview)
routes.get('/reviews', ReviewController.getReviews)

routes.post('/user', UserController.register)

module.exports = routes
