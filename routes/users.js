const _ = require('lodash')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//local imports
const {User, validate } = require('../models/user')

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne( {email: req.body.email} )
    if(user) return res.status(400).send('user already registered')

    user = new User (_.pick(req.body, ['name', 'email','password']))

    try {
        await user.save()
        res.send(_.pick(user, ['name', 'email']))
    }
    catch(ex){
        res.status(400).send('Unable to create user')
    }
})

module.exports = router