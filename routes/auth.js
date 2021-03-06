
const bcrypt = require("bcrypt");
const express = require("express");
const Joi = require("joi");
const router = express.Router()
const _ = require("lodash")


const {User} = require("../models/user")

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email and password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email and password')

    const token = user.generateAuthToken()

    // res.send(token)
    res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
})

const validate = ({email, password}) => {
    const schema = new Joi.object({
        email: Joi.string().min(2).max(255).required().email(), //.unique()
        password: Joi.string().min(2).max(255).required(),
    })
    return schema.validate({email: email, password: password})
}

module.exports = router