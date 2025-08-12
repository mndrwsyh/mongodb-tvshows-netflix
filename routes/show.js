const express = require("express");
// create express router
const router = express.Router();

const Show = require("../models/show");

router.get("/", async (req, res) => {
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
  const shows = await Show.find(filter).sort({ _id: -1 });
  res.send(shows);
});

// GET shows/:id - get a specific id
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the show data based on id
  const show = await Show.findById(id);
  res.send(show);
});

// post shows
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // make sure all fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    // create new movie
    const newShow = new Show({
      title: title,
      creator: creator,
      premiere_year: premiere_year,
      end_year: end_year,
      seasons: seasons,
      genre: genre,
      rating: rating,
    });

    // save the new movie into mongodb
    await newShow.save();

    res.status(200).send(newShow);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// PUT /shows/(insertidhere) - update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const creator = req.body.creator;
    const premiere_year = req.body.premiere_year;
    const end_year = req.body.end_year;
    const seasons = req.body.seasons;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // make sure all fields are not empty
    if (!title || !creator || !premiere_year || !seasons || !genre || !rating) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    const updatedShow = await Show.findByIdAndUpdate(
      id,
      {
        title: title,
        creator: creator,
        premiere_year: premiere_year,
        end_year: end_year,
        seasons: seasons,
        genre: genre,
        rating: rating,
      },
      {
        new: true, // return the updated data
      }
    );

    res.status(200).send(updatedShow);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// DELETE /shows/(insertidhere) - delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // delete the show
    await Show.findByIdAndDelete(id);
    res.status(200).send({
      message: `Show with the id of ${id} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
