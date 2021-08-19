const winston = require("winston");
require("express-async-errors") 


module.exports = () => {
  winston.handleExceptions(
    new winston.transports.File({ filename: "unhandledExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
