const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//local imports
const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newGenre = new Genre({ name: req.body.name });

  try {
    await newGenre.save();
    res.send(newGenre);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  const { error } = validate(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }

  genre.name = req.body.name;
  try {
    await genre.save();
    res.send(updatedGenre);
  } catch (ex) {
    res.status(400).send("Can't update genre right now");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Genre.deleteOne({ _id: req.params.id });
    res.send(await Genre.find());
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
