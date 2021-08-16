const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);

const validateUser = ({ name, email, password }) => {
  const schema = new Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(), //.unique()
    password: Joi.string().required(),
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
