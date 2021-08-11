const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");


const Genre = new mongoose.model("Genre", new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
  })
);


router.get("/", async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.find((g) => g.id === parseInt(req.params.id));
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newGenre = await new Genre({
    name: req.body.name,
  })

  try {
    const result = await newGenre.save()
    console.log(result)
    res.send(result)
  }
  catch(ex) {
    console.log(ex.message)
    res.send(ex.message)
  }
  
  
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.find((g) => g.id === parseInt(req.params.id));

  const { error } = validateGenre(req.body.name);
  if (error) {
    return res.send(error.details[0].message);
  }

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name: genre });
};

module.exports = router;
