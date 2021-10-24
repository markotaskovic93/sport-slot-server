const express = require('express')
const User = require('./src/main.js');
const app = express()


app.get('/', (req, res) => {
    res.send(User.getFullName())
})

app.listen(process.env.PORT || 4500, () => {
    console.log('app is running on port 4500')
})

