const express = require('express')
const app = express()
const { ValidationError } = require('express-validation')
const router = require('./routes/routes.js') 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    next()
});
app.use('/api/v1', router)
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    } 
    return res.status(500).json(err)
})
app.listen(process.env.PORT || 3000, () => console.log('app is running on port 3000'))

