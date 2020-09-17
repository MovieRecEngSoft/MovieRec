var assert = require('assert');

class MoviesMetadata{

    constructor(){
        this.movies = [];
        this.genreMap = new Map();
        this.companyMap = new Map();
    }

    addMovie(movie){
        this.movies.push(movie);
    }

    containsGenre(id){
        return this.genreMap.get(id) !== undefined;
    }

    addGenres(genres){
        for(let genre of genres){
            assert(!containsGenre(genre._id), "Genero ja existente.")
            this.genreMap.set(genre._id, genre.name);
        }
    }

    containsCompany(id){
        return this.companyMap.get(id) !== undefined;
    }
    
    addCompanies(companies){
        for(let company of companies){
            assert(!containsCompany(company._id), "Compania ja existente.")
            this.companyMap.set(company._id, company.name);
        }
    }

    get genres(){
        return this.genreMap.values();
    }

    get companies(){
        return this.companyMap.values();
    }

}

module.exports = MoviesMetadata;
