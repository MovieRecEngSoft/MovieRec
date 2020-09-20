var assert = require('assert')

class MoviesMetadata{

    constructor(){
        this.movies = []
        this.genreMap = new Map()
    }

    addMovie(movie){
        this.movies.push(movie)
    }

    containsGenre(id){
        return this.genreMap.get(id) !== undefined
    }

    addGenres(genres){
        for(let genre of genres){
            assert(!this.containsGenre(genre._id), "Genero ja existente.")
            this.genreMap.set(genre._id, genre)
        }
    }

    get genres(){
        return Array.from(this.genreMap.values())
    }

}

module.exports = MoviesMetadata
