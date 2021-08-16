const express = require('express')
const router = express.Router()

//local imports
const {User, validate } = require('../models/user')

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        await user.save()
        res.send(user)
    }
    catch(ex){
        res.status(400).send('Unable to create user')
    }
})

module.exports = router