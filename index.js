const express = require('express')
const app = express()
const router = require('./routes/routes.js') 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    next()
});
app.use('/api/v1', router)
app.listen(process.env.PORT || 3000, () => console.log('app is running on port 3000'))

