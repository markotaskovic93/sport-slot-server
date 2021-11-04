const express = require('express')
const router = express.Router()
//const playerAuth = require('../middleware/playerAuth.js')

const {
    loginPlayer,
    getAllPlayers,
    getPlayer,
    getPlayersByLocation,
    getBlockedPlayers,
    getBlockedPlayersByLocation,
    getVerifiedPlayers,
    getUnverifiedPlayers,
    getVerifiedPlayersByLocation,
    getUnverifiedPlayersByLocation,
    createPlayer,
    updatePlayer,
    updatePlayerAvatar,
    deletePlayerAccount,
    verifyPlayerAccount,
    blockPlayerAccount,
    unblockPlayerAccount
} = require('../controllers/PlayerController.js')

router.post('/players/login-player', (req, res) => {
    loginPlayer(req, res)
})

router.get('/players/get-players', (req, res) => {
    getAllPlayers(req, res)
})

router.get('/players/get-player/:id', (req, res) => {
    getPlayer(req, res)
})

router.get('/players/get-players-by-location/:location', (req, res) => {
    getPlayersByLocation(req, res)
})

router.get('/players/get-blocked-players', (req, res) => {
    getBlockedPlayers(req, res)
})

router.get('/players/get-bloced-players-by-location/:location', (req, res) => {
    getBlockedPlayersByLocation(req, res)
})

router.get('/players/get-verified-players', (req, res) => {
    getVerifiedPlayers(req, res)
})

router.get('/players/get-unverified-playrs', (req, res) => {
    getUnverifiedPlayers(req, res)
})

router.get('/players/get-verified-players-by-location/:location', (req, res) => {
    getVerifiedPlayersByLocation(req, res)
})

router.get('/players/get-unverified-players-by-location/:location', (req, res) => {
    getUnverifiedPlayersByLocation(req, res)
})

router.post('/players/create-player', (req, res) => {
    createPlayer(req, res)
})

router.put('/players/update-player', (req, res) => {
    updatePlayer(req, res)
})

router.put('/players/update-player-avatar', (req, res) => {
    updatePlayerAvatar(req, res)
})

router.delete('/players/destroy-player', (req, res) => {
    deletePlayerAccount(req, res)
})

router.get('/players/verify-player-account/:id/:verified', (req, res) => {
    verifyPlayerAccount(req, res)
})

router.get('/players/block-player-account/:id', (req, res) => {
    blockPlayerAccount(req, res)
})

router.get('/players/unblock-player-account/:id', (req, res) => {
    unblockPlayerAccount(req, res)
})

module.exports = router