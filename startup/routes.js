const express = require("express");
const genres = require("../routes/genres");
const home = require("../routes/home");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const movies = require("../routes/movies");
const error = require('../middleware/error');
const helmet = require("helmet");


module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use("/api/genres", genres);
  app.use("/api/users", users);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/auth", auth);
//   app.use("/", home);

  //error middleware
  app.use(error);
};
