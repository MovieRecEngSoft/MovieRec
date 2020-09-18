const express = require('express')

const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')

const authenticator = require('./authenticator.js')
const routes = express.Router()

routes.post('/login', authenticator.authenticate('local'),
    (request, response) => {response.sendStatus(302)}
)
    
routes.post('/logout', (request, response) => {
    if(request.isAuthenticated()){
        request.logOut()
        response.sendStatus(200)
    }
    response.sendStatus(205)
})

routes.get('/movies', MovieController.index)

routes.post('/user', UserController.register)

module.exports = routes
