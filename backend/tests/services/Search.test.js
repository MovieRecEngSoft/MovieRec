const MovieService = require('../../services/MovieService.js')
const connection = require('../../database/connection')

jest.unmock('../../database/models/Movie')

test('MovieService: search', () => {
    connection.connect().then(async _ =>{
        let movies = await MovieService.getMovies()
        let movie = await MovieService.getMovie(movies[0]._id)
        expect(movie._id).toBe(movies[0]._id)
        console.log(movies)
        connection.close()
    })
})