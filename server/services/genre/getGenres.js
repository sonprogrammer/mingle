const Genre = require("../../db/models/genreModel");

async function getGenres() {
  const genres = await Genre.find({});
  return genres;
}

module.exports = { getGenres };
