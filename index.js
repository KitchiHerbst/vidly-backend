// const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi)

const mongoose = require('mongoose')

//local imports
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers');
const rentals = require('./routes/rentals')
const { custom } = require("joi");
const movies = require("./routes/movies")

// this sets up our express app
const app = express();
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...') )
  .catch(() => console.error('Cant connect to mongodb'))

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug('Morgan Enabled')
}
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/', home)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));


