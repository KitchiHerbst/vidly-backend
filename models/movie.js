const mongoose = require("mongoose");
const Joi = require("Joi");

//local imports
const { Genre, validate } = require("./genre");

const Movie = new mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: Genre, required: true },
    numberInStock: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

const validate = (movie) => {
  const schema = new Joi.object({
    title: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  return schema.validate({
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });
};

exports.Movie = Movie;
exports.validate = validate;
