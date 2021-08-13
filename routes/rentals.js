const express = require("express");
const router = express.Router();

//local imports
const { Rental, validate } = require("../models/rental");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if(error){
        res.status('400').send('Invalid Rental request')
    }

    
})

module.exports = router