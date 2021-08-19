require("express-async-errors") 
const winston = require("winston");

// const config = require("config");
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
// const logger = require('./winstonLogger')
//local imports


const config = require("config");
// this sets up our express app
const app = express();

//new
require('./startup/routes')(app)



if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwt is not defined");
  process.exit(1);
}

winston.handleExceptions(new winston.transports.File({filename: 'unhandledExceptions.log'}))

process.on('unhandledRejection', (ex) => {
  throw ex
})


mongoose
  .connect("mongodb://localhost/vidly", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.error("Cant connect to mongodb"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled");
}

// throw new Error('bingo error')

//middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use("/api/genres", genres);
// app.use("/api/users", users);
// app.use("/api/customers", customers);
// app.use("/api/movies", movies);
// app.use("/api/rentals", rentals);
// app.use("/api/auth", auth);
// app.use("/", home);

// //error middleware
// app.use(error)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
