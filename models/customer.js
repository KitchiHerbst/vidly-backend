const mongoose = require("mongoose");

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
      default: false
    },
    phone: {
      type: String,
      required: true,
    },
  })
);

module.exports = Customer