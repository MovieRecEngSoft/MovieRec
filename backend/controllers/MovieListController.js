const { getMovieLists } = require('../services/MovieListService.js')
const MovieListService = require('../services/MovieListService.js')

module.exports = {

    async getMovieLists(request, response) {
        try{
            assert(request.isAuthenticated(), 'User must be authenticated to execute this operation.')
            assert(request.query.name, 'Missing parameter "name"')
            const userId = request.user._id
            const movieLists = await MovieListService.getMovieLists(userId, request.query.name)
            response.json(movieLists)
        }
        catch(error) {
            if (error instanceof assert.AssertionError)
                response.status(400).send(error.toString())
            else {
                response.status(500).send(error.toString())
            }
        }
    }

}
