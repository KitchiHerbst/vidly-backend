const mongoose = require("mongoose");
const Joi = require("joi");


const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      phone: {
        type: String,
        required: true,
        default: "0000000",
      },
      isGold: {
        type: Boolean,
        required: true,
        default: false,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 0,
        maxlength: 50,
      },
      dailyRentalRate: { type: Number, min: 0, required: true },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
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
