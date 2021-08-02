// const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");

//local imports
const genres = require('./routes/genres')
const home = require('./routes/home')

// this sets up our express app
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
app.use('/', home)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));


