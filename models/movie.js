const { Schema, model } = require("mongoose");

// declare schema for Movies
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

// create a Modal from the schema
const Movie = model("Movie", movieSchema);

// setup root route
module.exports = Movie;

// routes for movies

/*
GET /movies/(insertidhere) - find specific movie by id
POST /movies - add new
PUT /movies/(insertidhere) - update
DELETE /movies/(insertidhere) - delete
*/

// GET /movies - list all movies

// query params is everything after the question mark
