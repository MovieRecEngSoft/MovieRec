const MovieService = require('../../services/MovieService.js')
const connection = require('../../database/connection')

jest.unmock('../../database/models/Movie')

test('MovieService: search stages', () => {
    connection.connect().then(async _ =>{
        //searching for a page
        let movies = await MovieService.getMovies()
        //searching for a movie in the retrieved page
        let movie = await MovieService.getMovie(movies[0]._id)
        expect(movie._id).toBe(movies[0]._id)
        connection.close()
    })
})