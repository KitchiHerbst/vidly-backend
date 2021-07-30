//needed to import the express module
const express = require('express')

// this sets up our express app allowing us to use get, put, post, delete
const app = express()

app.get('/', (req, res) => {
    res.send('bingo bongo')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port}`))