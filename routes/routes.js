const express = require('express')
const router = express.Router()

const {
    getAllPlayers,
    getPlayer,
    createPlayer,
    updatePlayer
} = require('../controllers/PlayerController.js')

router.get('/get-players', (req, res) => {
    getAllPlayers(req, res)
})

module.exports = router