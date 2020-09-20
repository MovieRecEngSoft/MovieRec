const GenreService = require('../services/GenreService')

module.exports = {

    async index(request, response) {
        try{
            const genres = await GenreService.getGenres();
            response.json(genres)
        }
        catch(error){
            response.status(500).send(error.toString())
        } 
    }

}
