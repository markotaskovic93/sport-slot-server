import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('SAMO NESTO PRIKAZI JEBENO VISE !!!')
})

app.listen(process.env.PORT || 4500, () => {
    console.log('app is running on port 4500')
})

