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

}

exports.Movie = Movie
exports.validate = validate
