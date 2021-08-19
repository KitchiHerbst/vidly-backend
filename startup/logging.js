const winston = require("winston");
require("express-async-errors");

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "unhandledExceptions.log" })
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
