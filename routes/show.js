const express = require("express");
// create express router
const router = express.Router();

const {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/show");

router.get("/", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  const shows = await getShows(genre, rating, premiere_year);

  res.status(200).send(shows);
});

// GET shows/:id - get a specific id
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  const show = await getShow(id);
  res.status(200).send(show);
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

    res
      .status(200)
      .send(
        await addShow(
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
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

    res
      .status(200)
      .send(
        await updateShow(
          id,
          title,
          creator,
          premiere_year,
          end_year,
          seasons,
          genre,
          rating
        )
      );
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

    await deleteShow(id);

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
