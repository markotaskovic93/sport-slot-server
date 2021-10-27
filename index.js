const express = require('express')
const app = express()
const db = require('./models/index.js')
const { getAllPlayers, getPlayer } = require('./controllers/PlayerController.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    next()
});

app.get('/', (req, res) => {
    getAllPlayers(req, res)
})

app.get('/create-player', (req, res) => {
    console.log('create player endpoint')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port 3000')
})

