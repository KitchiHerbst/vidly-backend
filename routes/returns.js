const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");

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
  const timeDif = rental.dateReturned.getTime() - rental.dateOut.getTime();
  const dayDif = timeDif / (1000 * 3600 * 24);
  const cost = rental.movie.dailyRentalRate * dayDif;
  rental.rentalFee = cost;
  await rental.save();

  res.send(rental);
});

module.exports = router;
