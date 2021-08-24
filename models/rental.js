const mongoose = require("mongoose");
const Joi = require("joi");
const moment = require("moment");


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

rentalSchema.statics.lookup = function (customerId, movieId) {
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId,
  });
};

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

const Rental = new mongoose.model("Rental", rentalSchema);

const validateRental = ({ customerId, movieId }) => {
  const schema = new Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate({
    customerId: customerId,
    movieId: movieId,
  });
};

exports.Rental = Rental;
exports.validate = validateRental;
