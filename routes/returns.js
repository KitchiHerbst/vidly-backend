const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");
const moment = require('moment')

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId) {
    return res.status(400).send("must include customer id");
  }
  if (!req.body.movieId) {
    return res.status(400).send("must include movie id");
  }
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });
  if (!rental) {
    return res.status(404).send("rental not found");
  }

  if (rental.dateReturned) {
    return res.status(400).send("Return has been processed");
  }

  rental.dateReturned = new Date();
  const rentalDays = rental.dateReturned.diff(rental.dateOut, 'days')
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate
  await rental.save();

  res.send(rental);
});

module.exports = router;
