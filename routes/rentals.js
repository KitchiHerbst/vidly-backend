const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const mongoose = require("mongoose");

//local imports
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
}); 

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status("400").send("Movie not found");
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status("400").send("Customer not found");
  }

  if (movie.numberInStock === 0)
    return res.send(`Sorry ${movie.title} is unavaiable`);

  const rental = new Rental({
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status("500").send("Something failed");
  }

});

module.exports = router;
