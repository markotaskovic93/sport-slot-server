const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')


//const playerAuth = require('../middleware/playerAuth.js')
//const courtOwnerAuth = require('../middleware/courtOwnerAuth.js')
const {
    createPlayerValidation
} = require('../middleware/playerValidations.js')

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
    loginCourtOwner,
    createCourtOwnerAccount,
    updateCourtOwnerAccount,
    deleteCourtOwnerAccount,
    getBlockedCourtOwners,
    getBlockedCourtOwnersByState,
    getUnblockedCourtOwners,
    getUnblockedCourtOwnersByState,
    getVerifiedCourtOwners,
    getVerifiedCourtOwnersByState,
    getUnverifiedCourtOwners,
    getUnverifiedCourtOwnersByState,
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

const {
    createCourtSlot,
    getCourtSlots,
    updateCourtSlot,
    blockCourtSlot,
    unblockCourtSlot,
    deleteCourtSlot,
    deleteCourtSlots
} = require('../controllers/CourtSlotCotroller.js')

const {
    createSlotReservation
} = require('../controllers/SlotReservationController.js')

const {
    respondToInvitation
} = require('../controllers/SlotPlayersController.js')

// Player Routes
router.post('/players/login', (req, res) => loginPlayer(req, res)) // done
router.post('/player/create-player', [validate(createPlayerValidation)], (req, res) => createPlayer(req, res)) // done
router.post('/player/reset-player-password', (req, res) => resetPlayerPassword(req, res)) // done
router.put('/player/update-player-avatar', (req, res) => updatePlayerAvatar(req, res))
router.put('/player/update-player', (req, res) => updatePlayer(req, res)) // done
router.get('/player/get-players', (req, res) => getAllPlayers(req, res)) // done
router.get('/player/get-player/:id', (req, res) => getPlayer(req, res)) // done
router.get('/player/get-players-by-state/:state', (req, res) => getPlayersByState(req, res)) // done
router.get('/player/get-blocked-players', (req, res) => getBlockedPlayers(req, res)) // done
router.get('/player/get-blocked-players-by-state/:state', (req, res) => getBlockedPlayersByState(req, res)) // done
router.get('/player/get-verified-players', (req, res) => getVerifiedPlayers(req, res)) // done
router.get('/player/get-unverified-players', (req, res) => getUnverifiedPlayers(req, res)) // done
router.get('/player/get-verified-players-by-state/:state', (req, res) => getVerifiedPlayersByState(req, res)) // done
router.get('/player/get-unverified-players-by-state/:state', (req, res) => getUnverifiedPlayersByState(req, res)) // done
router.get('/player/verify-player-account/:id', (req, res) => verifyPlayerAccount(req, res)) // done
router.get('/player/block-player-account/:id', (req, res) => blockPlayerAccount(req, res)) // done
router.get('/player/unblock-player-account/:id', (req, res) => unblockPlayerAccount(req, res)) // done
router.delete('/player/destroy-player-account', (req, res) => deletePlayerAccount(req, res)) // done
// --------------------------------------- END OF Player Routes ------------------------------------------- //

// Court owner routes
router.post('/court-owner/login', (req, res) => loginCourtOwner(req, res)) //
router.post('/court-owner/create-court-owner-account', (req, res) => createCourtOwnerAccount(req, res)) // done 
router.put('/court-owner/update-court-owner-account', (req, res) => updateCourtOwnerAccount(req, res)) //  done
router.get('/court-owner/verify-court-owner-account/:id', (req, res) => verifyCourtOwnerAccount(req, res)) // done
router.get('/court-owner/block-court-owner-account/:id', (req, res) => blockCourtOwnerAccount(req, res)) // done
router.get('/court-owner/unblock-court-owner-account/:id', (req, res) => unblockCourtOwnerAccount(req, res)) // done
router.get('/court-owner/get-blocked-court-owners', (req, res) => getBlockedCourtOwners(req, res)) // done
router.get('/court-owner/get-blocked-court-owners-by-state/:state', (req, res) => getBlockedCourtOwnersByState(req, res)) // done
router.get('/court-owner/get-unblocked-court-owners', (req, res) => getUnblockedCourtOwners(req, res)) // done
router.get('/court-owner/get-unblocked-court-owners-by-state/:state', (req, res) => getUnblockedCourtOwnersByState(req, res)) // done
router.get('/court-owner/get-verified-court-owners', (req, res) => getVerifiedCourtOwners(req, res)) // done
router.get('/court-owner/get-verified-court-owners-by-state/:state', (req, res) => getVerifiedCourtOwnersByState(req, res)) // done
router.get('/court-owner/get-unverified-court-owners', (req, res) => getUnverifiedCourtOwners(req, res)) // done
router.get('/court-owner/get-unverified-court-owners-by-state/:state', (req, res) => getUnverifiedCourtOwnersByState(req, res)) // done
router.delete('/court-owner/destroy-court-owner-account', (req, res) => deleteCourtOwnerAccount(req, res)) // done
// -------------------------------------- End of Court Owner Routes --------------------------------------- //

// Court routes
router.post('/court/create-court', (req, res) => createCourt(req, res))
router.put('/court/update-court', (req, res) => updateCourt(req, res))
router.get('/court/get-courts-by-owner/:court_owner_id', (req, res) => getCourtsByCourtOwner(req, res))
router.get('/court/get-court/:court_id/:court_owner_id', (req, res) => getCourt(req, res))
router.get('/court/block-court/:court_id', (req, res) => blockCourt(req, res))
router.get('/court/unblock-court/:court_id', (req, res) => unblockCourt(req, res))
// -------------------------------------- End of Court Routes -------------------------------------------- //

// Court Slot routes
router.post('/court-slot/create-slot', (req, res) => createCourtSlot(req, res)) // done
router.put('/court-slot/update-slot', (req, res) => updateCourtSlot(req, res)) // done
router.get('/court-slot/get-court-slots/:id', (req, res) => getCourtSlots(req, res)) // done
router.get('/court-slot/block-slot/:id', (req, res) => blockCourtSlot(req, res)) // done
router.get('/court-slot/unblock-slot/:id', (req, res) => unblockCourtSlot(req, res)) // done
router.get('/court-slot/delete-slots', (req, res) => deleteCourtSlots(req, res)) // done
router.delete('/court-slot/delete-slot', (req, res) => deleteCourtSlot(req, res)) // done

// Court slot reservation
router.post('/slot-reservation/create-slot-reservation', (req, res) => createSlotReservation(req, res)) // done

// Slot players
router.post('/slot-players/respond-to-invitation', (req, res) => respondToInvitation(req, res))

module.exports = router