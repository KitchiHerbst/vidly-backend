const express = require("express");
const router = express.Router();

//local imports
const { Rental, validate } = require("../models/rental");

router.get("/", async (req, res) => {
  const rentals = Rental.find();
  res.send(rentals);
});

module.exports = router