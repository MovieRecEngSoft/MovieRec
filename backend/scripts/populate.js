const csv = require('csv-parser');
const fs = require('fs');
const MoviesMetadata = require('./MoviesMetadata');
const Movie = require('../database/models/Movie');
const Genre = require('../database/models/Genre');
const Company = require('../database/models/Company');

function decodeGenres(moviesMetadata, row){
	let genres = [];
	genresMetadata = JSON.parse(row.genres.replace(/\'/g, '"'));
	for(let genre of genresMetadata){
		if(!moviesMetadata.containsGenre(genre.id)){
			genres.push(new Genre({
				_id: genre.id,
				name: genre.name
			}));
		}
	}
	return genres;
}

function decodeCompanies(moviesMetadata, row){
	let companies = [];
	console.log(row.production_companies)
	companiesMetadata = JSON.parse(row.production_companies.replace(/\'/g, '"'));
	// for(let company of companiesMetadata){
	// 	if(!moviesMetadata.containsCompany(company.id)){
	// 		companies.push(new Company({
	// 			_id: company.id,
	// 			name: company.name
	// 		}));
	// 	}
	// }
	return companies;
}

function decodeMoviesMetadataRow(moviesMetadata, row){
	console.log(row);
	console.log(decodeCompanies(moviesMetadata, row));
	// let decodedRow = {
	// 	movie: {},
	// 	genres: decodeGenres(moviesMetadata, row),
	// 	companies: {}
	// };
	// return decodedRow;
}

function decodeMoviesMetadata(callback){
	let moviesMetadata = new MoviesMetadata()
	fs.createReadStream('scripts/metadata/movies_metadata.csv')
		.pipe(csv())
		.on('data', (row) => {
			let decodedRow = decodeMoviesMetadataRow(moviesMetadata, row);
			// moviesMetadata.addMovie(decodedRow.movie);
			// moviesMetadata.addGenres(decodedRow.genres);
			// moviesMetadata.addCompanies(decodedRow.companies);
		})
		.on('end', () => {
			callback(moviesMetadata);
		});
}


decodeMoviesMetadata((metadata) => {console.log("cabo")});