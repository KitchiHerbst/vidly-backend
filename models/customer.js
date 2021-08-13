const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  });
  return schema.validate({
    name: customer.name,
    phone: customer.phone,
    isGold: customer.isGold,
  });
};

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;
