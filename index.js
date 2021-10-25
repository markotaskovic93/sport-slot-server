const express = require('express')
const sequelize = require('./src/drivers/db/database.js')
const app = express()

app.get('/', (req, res) => {
    try {
        sequelize.authenticate()
        res.send('sve je ok sa konekcijom')
    } catch (error) {
        console.log('ne postoji konekcija')
    }
})

app.listen(process.env.PORT || 4500, () => {
    console.log('app is running on port 4500')
})

