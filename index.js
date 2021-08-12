// const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

const mongoose = require('mongoose')

//local imports
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers');
const { custom } = require("joi");

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
app.use('/', home)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));


