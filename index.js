const config = require("config");
//needed to import the express module
const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

//local imports
const log = require("./logger");
const auth = require("./authentication");
const genres = require('./routes/genres')

// this sets up our express app allowing us to use get, put, post, delete
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug('Morgan Enabled')
}
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/genres', genres)


app.get("/", (req, res) => {
  res.send('Vidly')
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate({ name: genre });
};
