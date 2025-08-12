const Show = require("../models/show");

async function getShows(genre, rating, premiere_year) {
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
  return shows;
}
async function getShow(id) {
  // load the show data based on id
  const show = await Show.findById(id);
  return show;
}
async function addShow(
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
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

  return newShow;
}
async function updateShow(
  id,
  title,
  creator,
  premiere_year,
  end_year,
  seasons,
  genre,
  rating
) {
  return await Show.findByIdAndUpdate(
    id,
    {
      title: title, // long method
      creator, // short method (can only do if both is the same name)
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
}
async function deleteShow(id) {
  // delete the show
  return await Show.findByIdAndDelete(id);
}

module.exports = {
  getShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
};
