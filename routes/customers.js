const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");

const Customer = new mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

module.exports = router