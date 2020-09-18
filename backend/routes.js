const express = require('express')

const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')
const ReviewController = require('./controllers/ReviewController')

const authenticator = require('./authenticator.js')
const routes = express.Router()

routes.post('/login', authenticator.authenticate('local', { 
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login'
}))
    
routes.post('/logout', (request, response) => {
    if(request.isAuthenticated()){
        request.logOut()
        response.sendStatus(200)
    }
    response.sendStatus(205)
})

routes.get('/movies', MovieController.index)

routes.post('/review/add', ReviewController.addReview)
routes.post('/review/edit', ReviewController.editReview)
routes.post('/review/remove', ReviewController.removeReview)
routes.get('/reviews', ReviewController.getReviews)

routes.post('/user', UserController.register)

module.exports = routes
