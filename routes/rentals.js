const express = require("express");
const router = express.Router();

//local imports
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status("400").send("Invalid Rental request");
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    return res.status("400").send("Movie not found");
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    return res.status("400").send("Customer not found");
  }

  if(movie.numberInStock === 0) return res.send(`Sorry ${movie.title} is unavaiable`)

  const newRental = new Rental({
    movie: { title: movie.title, dailyRentalRate: movie.dailyRentalRate },
    customer: {
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    dateOut: Date.now(),
    rentalFee: (customer.isGold) ? 3 : 5
  });

  result = await newRental.save();
  res.send(result);
});

module.exports = router;
