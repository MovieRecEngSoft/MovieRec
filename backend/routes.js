const express = require('express')

const MovieController = require('./controllers/MovieController')

const routes = express.Router()

routes.get('/movies', MovieController.index)

module.exports = routes
