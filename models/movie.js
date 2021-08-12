const mongoose = require("mongoose");
const Joi = require("Joi");

//local imports
const { genreSchema } = require("../models/genre");

const Movie = new mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

const validateMovie = (movie) => {
  const schema = new Joi.object({
    title: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  return schema.validate({
    title: movie.title,
    genre: movie.genre,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });
};

exports.Movie = Movie;
exports.validate = validateMovie;
