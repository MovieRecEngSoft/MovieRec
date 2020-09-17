const csv = require('csv-parser');
const fs = require('fs');
const MoviesMetadata = require('./MoviesMetadata');
const Movie = require('../database/models/Movie');
const Genre = require('../database/models/Genre');

function decodeGenresInfo(row, moviesMetadata){
	let genresInfo = {
		genresIds: [],
		newGenres: []
	};
	genres = JSON.parse(row.genres.replace(/\'/g, '"'));
	for(let genre of genres){
		genresInfo.genresIds.push(genre.id);
		if(!moviesMetadata.containsGenre(genre.id)){
			genresInfo.newGenres.push(new Genre({
				_id: genre.id,
				name: genre.name
			}));
		}
	}
	return genresInfo;
}

function decodeMovie(row, genresIds){
	
	let movie = new Movie({
		title: row.title,
		poster_path: row.poster_path,
		release_date: row.release_date,
		overview: row.overview,
		genres: []
	});
	for(let genreId of genresIds){
		movie.genres.push(genreId);
	}
	return movie;

}

function decodeMoviesMetadataRow(row, moviesMetadata){
	let genresInfo = decodeGenresInfo(row, moviesMetadata);
	let decodedMovie = decodeMovie(row, genresInfo.genresIds);
	let decodedRow = {
		movie: decodedMovie,
		genres: genresInfo.newGenres
	};
	return decodedRow;
}

function decodeMoviesMetadata(callback){
	let moviesMetadata = new MoviesMetadata()
	fs.createReadStream('scripts/metadata/movies_metadata.csv')
		.pipe(csv())
		.on('data', (row) => {
			let decodedRow = decodeMoviesMetadataRow(row, moviesMetadata);
			moviesMetadata.addMovie(decodedRow.movie);
			if(decodedRow.genres.length > 0){
				moviesMetadata.addGenres(decodedRow.genres);
			}
		})
		.on('end', () => {
			callback(moviesMetadata);
		});
}

decodeMoviesMetadata((moviesMetadata) => {
	// genre = moviesMetadata.genres[0];
	// genre.save(function (err, fluffy) {
	// 	if (err) return console.error(err);
	// 	console.log("Genre Inserted");
	// });
	// Genre.insertMany(moviesMetadata.genres.slice(0, 2), function(error, docs) {
	// 	if(error)
	// 		return console.log(error);
	// 	else
	// 		console.log("Genres Inserted");
	// });
	
});