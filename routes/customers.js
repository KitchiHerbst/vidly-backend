const express = require("express");
const router = express.Router();

//local imports
const { Customer, validate } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  if (error) {
    return res.send(error.details[0].message);
  }

  const newCustomer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  const result = await newCustomer.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  if (error) {
    return res.send(error.details[0].message);
  }

  const customer = await Customer.findById(req.params.id);
  const updatedCustomer = customer.set({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  const result = await updatedCustomer.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.send(await Customer.find());
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
