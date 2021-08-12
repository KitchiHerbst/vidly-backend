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

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    res.send(customer)
})

router.post("/", async (req, res) => {
    const newCustomer = new Customer ({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    const result = await newCustomer.save()
    res.send(result)
})

router.put("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    const updatedCustomer = customer.set({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    const result = await updatedCustomer.save()
    res.send(result)
})

module.exports = router