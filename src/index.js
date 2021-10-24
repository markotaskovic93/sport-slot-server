import express from 'express'
import sequelize from './drivers/db/database'
const app = express()

app.get('/', (req, res) => {
    //res.send(sequelize)
    console.log('what is DB: ', sequelize)
})

app.listen(4500, () => {
    console.log('app is running on port 4500')
})

