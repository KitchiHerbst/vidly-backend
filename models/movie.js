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

const validateMovie = ({title, genreId, numberInStock, dailyRentalRate}) => {
  const schema = new Joi.object({
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });
  
  return schema.validate({
    title: title,
    genreId: genreId,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate,
  });
};

exports.Movie = Movie;
exports.validate = validateMovie;
