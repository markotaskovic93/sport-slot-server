const express = require('express')
//const sequelize = require('./src/drivers/db/database.js')
const app = express()

app.get('/', (req, res) => {
    res.send('staje sad mamu ti mrtvu jebem')
})

app.listen(process.env.PORT || 4500, () => {
    console.log('app is running on port 4500')
})

