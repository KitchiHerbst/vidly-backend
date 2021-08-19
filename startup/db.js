const mongoose = require("mongoose");
const logger = require("../winston/infoLogger");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to MongoDB..."));
};
