const express = require("express");

const logger = require("./winston/infoLogger");
const app = express();
// const morgan = require("morgan");

//local imports
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
// if (app.get("env") === "development") {
//   app.use(morgan("tiny"));
//   debug("Morgan Enabled");
// }

// throw new Error('bingo error')

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`listening on ${port}`));
