const express = require("express");
const mongoose = require("mongoose");

// setup an express app
const app = express();

// connect to MongoDB using Mongoose

async function connectToMongoDB() {
  try {
    // wait for the mongodb to connect
    await mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is connected");
  } catch {
    console.log(error);
  }
}

// triggers the connect with MongoDB
connectToMongoDB();

// MOVIES

// declare schema for Movies
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
});

// create a Modal from the schema
const Movie = mongoose.model("Movie", movieSchema);

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding....");
});

// routes for movies

/*
GET /movies/(insertidhere) - find specific movie by id
POST /movies - add new
PUT /movies/(insertidhere) - update
DELETE /movies/(insertidhere) - delete
*/

// GET /movies - list all movies

// query params is everything after the question mark

app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;
  3;

  // create an empty container for filter
  let filter = {};
  // if directer exist then only add it to filtr container
  if (director) {
    filter.director = director;
  }

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = rating;
  }

  // load the movies data from Mongodb
  const movies = await Movie.find(filter);
  res.send(movies);
});

// GET movies/:id - get a specific id
app.get("movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// SHOWS

// declare schema for Shows
const showSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: String,
  genre: String,
  rating: Number,
});

// create a Modal from the schema
const Show = mongoose.model("Show", showSchema);

// routes for shows
app.get("/shows", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;
  3;

  // create an empty container for filter
  let filter = {};
  // if directer exist then only add it to filtr container

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }
  // load the shows data from Mongodb
  const shows = await Show.find(filter);
  res.send(shows);
});

// GET shows/:id - get a specific id
app.get("shows/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await Show.findById(id);
  res.send(show);
});

// start the express
app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
