const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//local imports
const { Genre, validate } = require("../models/genre");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  // throw new Error('Could not get genres')
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Invalid GenreId");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newGenre = new Genre({ name: req.body.name });

  try {
    await newGenre.save();
    res.send(newGenre);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

router.put("/:id", [validateObjectId, auth], async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Invalid GenreId");

  const { error } = validate(req.body.name);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.name = req.body.name;
  try {
    await genre.save();
    res.send(genre);
  } catch (ex) {
    res.status(400).send("Can't update genre right now");
  }
});

router.delete("/:id", [validateObjectId, auth, admin], async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Invalid GenreId");

  try {
    await Genre.deleteOne(genre);
    res.send(await Genre.find());
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
