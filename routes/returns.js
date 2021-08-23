const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  if (!req.body.customerId) {
    return res.status(400).send("must include customer id");
  }
  if (!req.body.movieId) {
    return res.status(400).send("must include movie id");
  }
  res.status(401).send("unauthorized");
});

module.exports = router;

