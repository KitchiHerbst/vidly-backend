const mongoose = require("mongoose");
const logger = require("../winston/infoLogger");
const config = require("config");

module.exports = () => {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${config.get("db")}...`));
};
