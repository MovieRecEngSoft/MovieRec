const csv = require('csv-parser')
const fs = require('fs')
const connection = require('../connection')
const MoviesMetadata = require('./MoviesMetadata')
const Movie = require('../models/Movie')
const Genre = require('../models/Genre')

function decodeGenresInfo(row, moviesMetadata){
	let genresInfo = {
		genresIds: [],
		newGenres: []
	}
	genres = JSON.parse(row.genres.replace(/\'/g, '"'))
	for(let genre of genres){
		genresInfo.genresIds.push(genre.id)
		if(!moviesMetadata.containsGenre(genre.id)){
			genresInfo.newGenres.push(new Genre({
				_id: genre.id,
				name: genre.name
			}))
		}
	}
	return genresInfo
}

function decodeMovie(row, genresIds){
	let movie = new Movie({
		title: row.title,
		poster_path: row.poster_path,
		release_date: row.release_date,
		overview: row.overview,
		genres: []
	})
	for(let genreId of genresIds){
		movie.genres.push(genreId)
	}
	return movie
}

function decodeMoviesMetadataRow(row, moviesMetadata){
	let genresInfo = decodeGenresInfo(row, moviesMetadata)
	let decodedMovie = decodeMovie(row, genresInfo.genresIds)
	let decodedRow = {
		movie: decodedMovie,
		genres: genresInfo.newGenres
	}
	return decodedRow
}

function decodeMoviesMetadata(callback){
	let moviesMetadata = new MoviesMetadata()
	fs.createReadStream('database/scripts/metadata/movies_metadata.csv')
		.pipe(csv())
		.on('data', (row) => {
			let decodedRow = decodeMoviesMetadataRow(row, moviesMetadata)
			moviesMetadata.addMovie(decodedRow.movie)
			if(decodedRow.genres.length > 0){
				moviesMetadata.addGenres(decodedRow.genres)
			}
		})
		.on('end', _ => {
			callback(moviesMetadata)
		})
}

decodeMoviesMetadata((moviesMetadata) => {
	connection.connect().then( _ => {
		Promise.all([
			new Promise((resolve, reject) => {
				Movie.insertMany(moviesMetadata.movies, function(error) {
					if(error) {
						reject(error)
					}
					else {
						console.log("Movies Inserted")
						resolve()
					}
				})
			}),
			new Promise((resolve, reject) => {
				Genre.insertMany(moviesMetadata.genres, function(error) {
					if(error) {
						reject(error)
					}
					else {
						console.log("Genres Inserted")
						resolve()
					}
				})
			})
		]).catch(error => {
			console.log(error)
		}).finally(_ => {
			connection.close()
		})
	})
})
