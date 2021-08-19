require("express-async-errors") 
const winston = require("winston");
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const app = express();

//local imports
require('./startup/routes')(app)
require('./startup/db')()

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwt is not defined");
  process.exit(1);
}

winston.handleExceptions(new winston.transports.File({filename: 'unhandledExceptions.log'}))

process.on('unhandledRejection', (ex) => {
  throw ex
})


if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}

// throw new Error('bingo error')



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
