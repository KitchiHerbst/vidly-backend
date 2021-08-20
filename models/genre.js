const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
});

const Genre = new mongoose.model("Genre", genreSchema);

const validateGenre = (name) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });
  return schema.validate({ name: name });
};

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
