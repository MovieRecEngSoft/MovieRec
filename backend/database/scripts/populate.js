const csv = require('csv-parser')
const fs = require('fs')
const connection = require('../connection')
const MoviesMetadata = require('./MoviesMetadata')
const KeywordsMetada = require('./KeywordsMetadata')
const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const Keyword = require('../models/Keyword')


function decodeKeywordsInfo(row, keywordsMetada){
	let keywordsInfo = {
		keywordsIds: [],
		newKeywords: []
	}
	keywords = JSON.parse(row.keywords.replace(/\'/g, '"'))
	for(let keyword of keywords){
		keywordsInfo.keywordsIds.push(keyword.id)
		if(!keywordsMetada.containsKeyword(keyword.id)){
			keywordsInfo.newKeywords.push(new Keyword({
				_id: keyword.id,
				name: keyword.name
			}))
		}
	}
	return keywordsInfo
}

function decodeKeywordsMetadaRow(row, keywordsMetada){
	let keywordsInfo = decodeKeywordsInfo(row, keywordsMetada)
	let decodedRow = {
		id: row.id,
		keywordsIds: keywordsInfo.keywordsIds,
		keywords: keywordsInfo.newKeywords
	}
	return decodedRow
}

async function decodeKeywordsMetada(){
	return new Promise((resolve, reject) => {
		let keywordsMetada = new KeywordsMetada()
		fs.createReadStream('./database/scripts/metadata/keywords.csv')
			.pipe(csv())
			.on('data', (row) => {
				let decodedRow = decodeKeywordsMetadaRow(row, keywordsMetada)
				keywordsMetada.setKeywordsIds(decodedRow.id, decodedRow.keywordsIds)
				if(decodedRow.keywords.length > 0){
					keywordsMetada.addKeywords(decodedRow.keywords)
				}
			})
			.on('end', _ => {
				resolve(keywordsMetada)
			})
			.on('error', reject)
	})
}

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

function decodeMovie(row, genresIds, idToKeywordsIds){
	let movie = new Movie({
		title: row.title,
		poster_path: row.poster_path,
		release_date: row.release_date,
		overview: row.overview,
		genres: [],
		keywords: [],
    	recommended_movies: []
	})
	for(let genreId of genresIds){
		movie.genres.push(genreId)
	}
	let keywordsIds = idToKeywordsIds.get(row.id)
	for(let keywordId of keywordsIds){
		movie.keywords.push(keywordId)
	}
	return movie
}

function decodeMoviesMetadataRow(row, moviesMetadata, idToKeywordsIds){
	let genresInfo = decodeGenresInfo(row, moviesMetadata)
	let decodedMovie = decodeMovie(row, genresInfo.genresIds, idToKeywordsIds)
	let decodedRow = {
		movie: decodedMovie,
		genres: genresInfo.newGenres
	}
	return decodedRow
}

function decodeMoviesMetadata(idToKeywordsIds){
	return new Promise((resolve, reject) => {
		let moviesMetadata = new MoviesMetadata()
		fs.createReadStream('./database/scripts/metadata/movies_metadata.csv')
			.pipe(csv())
			.on('data', (row) => {
				let decodedRow = decodeMoviesMetadataRow(row, moviesMetadata, idToKeywordsIds)
				moviesMetadata.addMovie(decodedRow.movie)
				if(decodedRow.genres.length > 0){
					moviesMetadata.addGenres(decodedRow.genres)
				}
			})
			.on('end', _ => {
				resolve(moviesMetadata)
			})
			.on('error', reject)
	})
}

async function decodeMetadata(){
	keywordsMetada = await decodeKeywordsMetada()
	moviesMetadata = await decodeMoviesMetadata(keywordsMetada.idToKeywordsIds)
	console.log(keywordsMetada.keywords)
	console.log(moviesMetadata.movies)
	console.log(moviesMetadata.genres)
}

decodeMetadata();

// connection.connect().then( _ => {
// 	Promise.all([
// 		new Promise((resolve, reject) => {
// 			Movie.insertMany(moviesMetadata.movies, function(error) {
// 				if(error) {
// 					reject(error)
// 				}
// 				else {
// 					console.log("Movies Inserted")
// 					resolve()
// 				}
// 			})
// 		}),
// 		new Promise((resolve, reject) => {
// 			Genre.insertMany(moviesMetadata.genres, function(error) {
// 				if(error) {
// 					reject(error)
// 				}
// 				else {
// 					console.log("Genres Inserted")
// 					resolve()
// 				}
// 			})
// 		}),
// 		new Promise((resolve, reject) => {
// 			Keyword.insertMany(keywordsMetada.keywords, function(error) {
// 				if(error) {
// 					reject(error)
// 				}
// 				else {
// 					console.log("Keywords Inserted")
// 					resolve()
// 				}
// 			})
// 		}),
// 	]).catch(error => {
// 		console.log(error)
// 	}).finally(_ => {
// 		connection.close()
// 	})
// })
