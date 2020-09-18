const express = require('express')

const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/movies', MovieController.index)

routes.post('/user', UserController.register)

module.exports = routes
