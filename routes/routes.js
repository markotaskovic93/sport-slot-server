const express = require('express')
const router = express.Router()
//const playerAuth = require('../middleware/playerAuth.js')
//const courtOwnerAuth = require('../middleware/courtOwnerAuth.js')

const {
    loginPlayer,
    getAllPlayers,
    getPlayer,
    getPlayersByState,
    getBlockedPlayers,
    getBlockedPlayersByState,
    getVerifiedPlayers,
    getUnverifiedPlayers,
    getVerifiedPlayersByState,
    getUnverifiedPlayersByState,
    createPlayer,
    updatePlayer,
    updatePlayerAvatar,
    deletePlayerAccount,
    verifyPlayerAccount,
    blockPlayerAccount,
    unblockPlayerAccount,
    resetPlayerPassword
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
router.post('/players/login', (req, res) => loginPlayer(req, res)) // done
router.post('/players/create-player', (req, res) => createPlayer(req, res)) // done
router.post('/players/reset-player-password', (req, res) => resetPlayerPassword(req, res)) // done
router.put('/players/update-player-avatar', (req, res) => updatePlayerAvatar(req, res))
router.put('/players/update-player', (req, res) => updatePlayer(req, res)) // done
router.get('/players/get-players', (req, res) => getAllPlayers(req, res)) // done
router.get('/players/get-player/:id', (req, res) => getPlayer(req, res)) // done
router.get('/players/get-players-by-state/:state', (req, res) => getPlayersByState(req, res)) // done
router.get('/players/get-blocked-players', (req, res) => getBlockedPlayers(req, res)) // done
router.get('/players/get-blocked-players-by-state/:state', (req, res) => getBlockedPlayersByState(req, res)) // done
router.get('/players/get-verified-players', (req, res) => getVerifiedPlayers(req, res)) // done
router.get('/players/get-unverified-players', (req, res) => getUnverifiedPlayers(req, res)) // done
router.get('/players/get-verified-players-by-state/:state', (req, res) => getVerifiedPlayersByState(req, res)) // done
router.get('/players/get-unverified-players-by-state/:state', (req, res) => getUnverifiedPlayersByState(req, res)) // done
router.get('/players/verify-player-account/:id', (req, res) => verifyPlayerAccount(req, res)) // done
router.get('/players/block-player-account/:id', (req, res) => blockPlayerAccount(req, res)) // done
router.get('/players/unblock-player-account/:id', (req, res) => unblockPlayerAccount(req, res)) // done
router.delete('/players/destroy-player-account', (req, res) => deletePlayerAccount(req, res)) // done
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