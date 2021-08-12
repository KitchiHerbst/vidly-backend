const express = require("express");
const router = express.Router();

//local imports
const { Movie, validate } = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  if (error) {
    return res.send(error.details[0].message);
  }

  const newMovie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  const result = await newMovie.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  if (error) {
    return res.send(error.details[0].message);
  }

  const movie = await Movie.findById(req.params.id);
  const newMovie = movie.set({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  const result = await newMovie.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
    try{
        await Movie.deleteOne({_id: req.params.id})
        res.send(await Movie.find())
    }
    catch(ex){
        res.send(ex.message)
    }
})

module.exports = router;
