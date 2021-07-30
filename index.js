//needed to import the express module
const express = require('express')

// this sets up our express app allowing us to use get, put, post, delete
const app = express()

let genres = [
    {
        id: 1,
    name: 'horror'
},{
    id: 2,
name: 'comedy'
},{
    id: 3,
name: 'thriller'
},{
    id: 4,
name: 'romance'
}
]

app.get('/', (req, res) => {
    res.send('bingo bongo')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port}`))