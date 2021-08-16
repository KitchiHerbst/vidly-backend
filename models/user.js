const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
});

const User = new mongoose.model("User", userSchema);

const validateUser = ({ name, email, password }) => {
  const schema = new Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(255).required().email(), //.unique()
    password: Joi.string().min(2).max(255).required(),
  });

  return schema.validate({
    name: name,
    email: email,
    password: password,
  });
};

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
