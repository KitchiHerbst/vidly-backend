const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const Joi = require("joi");
const validate = require("../middleware/validateRequest");

const validateReturn = ({ customerId, movieId }) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate({ customerId: customerId, movieId: movieId });
};

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) {
    return res.status(404).send("rental not found");
  }

  if (rental.dateReturned) {
    return res.status(400).send("Return has been processed");
  }

  rental.return();
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );

  res.send(rental);
});

module.exports = router;
