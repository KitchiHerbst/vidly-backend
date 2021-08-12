const express = require("express");
const router = express.Router();

//local imports
const { Movie, validate } = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

module.exports = router;
