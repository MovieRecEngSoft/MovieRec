const express = require('express')

const GenreController = require('./controllers/GenreController')
const MovieController = require('./controllers/MovieController')
const UserController = require('./controllers/UserController')
const ReviewController = require('./controllers/ReviewController')
const MovieListController = require('./controllers/MovieListController')

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

function checkNotAuthentication(request, response, next){
    if(request.isAuthenticated()){
        response.sendStatus(205)
    }
    else {
        next()
    }
}

routes.get("/session", UserController.getUserSession)

routes.post('/login', checkNotAuthentication, authenticator.authenticate('local'),
    (request, response) => {response.sendStatus(204)}
)

routes.post('/logout', (request, response) => {
    if(request.isAuthenticated()){
        request.logOut()
        response.sendStatus(204)
    }
    else{
        response.sendStatus(205)
    }
})

routes.get('/genres', GenreController.index)

routes.get('/movies', MovieController.getMovies)
routes.get('/movie', MovieController.getMovie)

routes.get('/review', ReviewController.getReview)
routes.post('/review', checkAuthentication, ReviewController.addReview)
routes.patch('/review', checkAuthentication, ReviewController.editReview)
routes.delete('/review', checkAuthentication, ReviewController.removeReview)
routes.post('/review/like', checkAuthentication, ReviewController.toggleLikeReview)
routes.post('/review/comment', checkAuthentication, ReviewController.addComment)
routes.patch('/review/comment', checkAuthentication, ReviewController.editComment)
routes.delete('/review/comment', checkAuthentication, ReviewController.removeComment)
routes.get('/reviews', ReviewController.getReviews)

routes.get('/user', UserController.getProfile)
routes.post('/user', UserController.register)
routes.delete('/user', UserController.delete)
routes.patch('/user', checkAuthentication, UserController.edit)
routes.post('/user/follow', checkAuthentication, UserController.toggleFollow)
routes.get('/user/activity', UserController.getUserActivity)
routes.get('/user/followingActivity', UserController.getFollowingActivity)
routes.get('/user/moviesHistory', UserController.getMoviesHistory)
routes.get('/user/recommendedMovies', UserController.getRecommendedMovies)

routes.get('/movieLists', MovieListController.getMovieLists)
routes.get('/movieList', MovieListController.getMovieListMovies)
routes.put('/movieList', MovieListController.addMovieList)
routes.delete('/movieList', MovieListController.deleteMovieList)
routes.put('/movieList/movie', MovieListController.addMovieToMovieList)
routes.delete('/movieList/movie', MovieListController.deleteMovieFromMovieList)

module.exports = routes
