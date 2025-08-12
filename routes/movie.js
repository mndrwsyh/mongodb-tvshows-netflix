const express = require("express");
// create express router
const router = express.Router();

const Movie = require("../models/movie");

router.get("/", async (req, res) => {
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
  const movies = await Movie.find(filter).sort({ _id: -1 });
  res.send(movies);
});

// GET movies/:id - get a specific id
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// POST /movies - add new
// this post route need to accept the following parameters:
/*
- title
- director
- release_year
- genre
- rating
*/
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // make sure all fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new movie
    const newMovie = new Movie({
      title: title,
      director: director,
      release_year: release_year,
      genre: genre,
      rating: rating,
    });

    // save the new movie into mongodb
    await newMovie.save();

    res.status(200).send(newMovie);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// PUT /movies/(insertidhere) - update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // make sure all fields are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        director: director,
        release_year: release_year,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedMovie);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// DELETE /movies/(insertidhere) - delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the movie
    await Movie.findByIdAndDelete(id);
    res.status(200).send({
      message: `Movie with the id of ${id} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
