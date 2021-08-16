const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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

router.post("/", auth, async (req, res) => {
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

  try {
    await newCustomer.save();
    res.send(newCustomer);
  } catch (ex) {
    res.status("400").send("Can't create account right now");
  }
});

router.put("/:id", auth, async (req, res) => {
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
  try {
    await updatedCustomer.save();
    res.send(updatedCustomer);
  } catch (ex) {
    res.status("400").send("Having trouble saving account details");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.send(await Customer.find());
  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
