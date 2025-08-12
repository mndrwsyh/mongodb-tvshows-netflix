const express = require("express");
// create express router
const router = express.Router();

const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

router.get("/", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  const movies = await getMovies(genre, rating, director);

  res.status(200).send(movies);
});

// GET movies/:id - get a specific id
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const movie = await getMovie(id);
  res.status(200).send(movie);
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

    res
      .status(200)
      // short hand
      .send(await addMovie(title, director, release_year, genre, rating));
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

    res
      .status(200)
      .send(
        await updateMovie(id, title, director, release_year, genre, rating)
      );
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

    await deleteMovie(id);

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
