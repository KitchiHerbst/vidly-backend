const mongoose = require("mongoose");
const Joi = require("joi");

//local imports
const { customerSchema } = require("./customer");
const { movieSchema } = require("./movie");

const rentalSchema = new mongoose.Schema({
  customer: { type: customerSchema, required: true },
  movie: { type: movieSchema, required: true },
});

const Rental = new mongoose.model("Rental", rentalSchema);

const validateRental = ({ customerId, movieId }) => {
  const schema = new Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate({
    customerId: customerId,
    movieId: movieId,
  });
};

exports.Rental = Rental;
exports.validate = validateRental;
