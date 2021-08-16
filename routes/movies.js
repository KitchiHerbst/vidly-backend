const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//local imports
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log("error");
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Genre not found");
  }
  const movie = new Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  try {
    await movie.save();
    res.send(movie);
  } catch (ex) {
    res.status(400).send("Can't create movie at this time");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid Genre");

  const movie = await Movie.findById(req.params.id);

  const newMovie = await movie.set({
    title: req.body.title,
    genre: { name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  const result = await newMovie.save();
  res.send(result);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Movie.deleteOne({ _id: req.params.id });
    res.send(await Movie.find());
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
