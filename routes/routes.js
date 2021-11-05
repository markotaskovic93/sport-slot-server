const express = require('express')
const router = express.Router()
//const playerAuth = require('../middleware/playerAuth.js')
//const courtOwnerAuth = require('../middleware/courtOwnerAuth.js')

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

const {
    createCourtOwnerAccount,
    updateCourtOwnerAccount,
    deleteCourtOwnerAccount,
    loginCourtOwner,
    verifyCourtOwnerAccount,
    blockCourtOwnerAccount,
    unblockCourtOwnerAccount,
} = require('../controllers/CourtOwnerController.js')

const {
    createCourt,
    updateCourt,
    getCourtsByCourtOwner,
    getCourt,
    blockCourt,
    unblockCourt
} = require('../controllers/CourtController.js')


// Player Routes
router.post('/players/login', (req, res) => loginPlayer(req, res))
router.post('/players/create-player', (req, res) => createPlayer(req, res))
router.put('/players/update-player-avatar', (req, res) => updatePlayerAvatar(req, res))
router.put('/players/update-player', (req, res) => updatePlayer(req, res))
router.get('/players/get-players', (req, res) => getAllPlayers(req, res))
router.get('/players/get-player/:id', (req, res) => getPlayer(req, res))
router.get('/players/get-players-by-location/:location', (req, res) => getPlayersByLocation(req, res))
router.get('/players/get-blocked-players', (req, res) => getBlockedPlayers(req, res))
router.get('/players/get-bloced-players-by-location/:location', (req, res) => getBlockedPlayersByLocation(req, res))
router.get('/players/get-verified-players', (req, res) => getVerifiedPlayers(req, res))
router.get('/players/get-unverified-playrs', (req, res) => getUnverifiedPlayers(req, res))
router.get('/players/get-verified-players-by-location/:location', (req, res) => getVerifiedPlayersByLocation(req, res))
router.get('/players/get-unverified-players-by-location/:location', (req, res) => getUnverifiedPlayersByLocation(req, res))
router.get('/players/verify-player-account/:id', (req, res) => verifyPlayerAccount(req, res))
router.get('/players/block-player-account/:id', (req, res) => blockPlayerAccount(req, res))
router.get('/players/unblock-player-account/:id', (req, res) => unblockPlayerAccount(req, res))
router.delete('/players/destroy-player-account', (req, res) => deletePlayerAccount(req, res))
// --------------------------------------- END OF Player Routes ------------------------------------------- //

// Court owner routes
router.post('/court-owner/login', (req, res) => loginCourtOwner(req, res))
router.post('/court-owner/create-court-owner-account', (req, res) => createCourtOwnerAccount(req, res))
router.put('/court-owner/update-court-owner-account', (req, res) => updateCourtOwnerAccount(req, res))
router.get('/court-owner/verify-court-owner-account/:id', (req, res) => verifyCourtOwnerAccount(req, res))
router.get('/court-owner/block-court-owner-account/:id', (req, res) => blockCourtOwnerAccount(req, res))
router.get('/court-owner/unblock-court-owner-account/:id', (req, res) => unblockCourtOwnerAccount(req, res))
router.delete('/court-owner/destroy-court-owner-account', (req, res) => deleteCourtOwnerAccount(req, res))
// -------------------------------------- End of Court Owner Routes --------------------------------------- //


// Court routes
router.post('/court/create-court', (req, res) => createCourt(req, res))
router.put('/court/update-court', (req, res) => updateCourt(req, res))
router.get('/court/get-courts-by-owner/:court_owner_id', (req, res) => getCourtsByCourtOwner(req, res))
router.get('/court/get-court/:court_id/:court_owner_id', (req, res) => getCourt(req, res))
router.get('/court/block-court/:court_id', (req, res) => blockCourt(req, res))
router.get('/court/unblock-court/:court_id', (req, res) => unblockCourt(req, res))
// -------------------------------------- End of Court Routes -------------------------------------------- //


module.exports = router