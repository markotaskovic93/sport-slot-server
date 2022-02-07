const express = require('express')
const router = express.Router()
const validator = require('express-joi-validation').createValidator({
    passError: true
});

//const playerAuth = require('../middleware/auth/playerAuth.js')
//const courtOwnerAuth = require('../middleware/auth/courtOwnerAuth.js')

const {
    createPlayerValidation,
    updatePlayerValidation,
    getPlayerByID
} = require('../middleware/validation/playerValidations.js')

const {
    searchValidation
} = require('../middleware/validation/searchValidations.js')

const PlayerController = require('../controllers/PlayerController.js')
const PlayerPaymentMethodController = require('../controllers/PlayerPaymentMethodController.js')
const CourtOwnerController = require('../controllers/CourtOwnerController.js')
const CourtOwnerPaymentMethodController = require('../controllers/CourtOwnerPaymentMethodController.js')


const {
    createCourt,
    updateCourt,
    getCourtsByCourtOwner,
    getCourt,
    blockCourt,
    unblockCourt,
    searchCourt,
    deleteCourt
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
} = require('../controllers/SlotPlayersController.js');
const { route } = require('express/lib/application');




// Player Routes
router.post('/player/login', [], (req, res) => PlayerController.loginPlayer(req, res)) // done
router.post('/player/create-player', [validator.query(createPlayerValidation)], (req, res) => PlayerController.createPlayerAccount(req, res)) // done
router.put('/player/update-player', [validator.query(updatePlayerValidation)], (req, res) => PlayerController.updatePlayerAccount(req, res)) // done
router.get('/player/get-player/:id', [validator.query(getPlayerByID)], (req, res) => PlayerController.getPlayer(req, res)) // done
router.delete('/player/delete-player/:id', [], (req, res) => PlayerController.deletePlayerAccount(req, res)) // done
router.get('/player/find-players/:state/:city/:full_name?', [], (req, res) => PlayerController.findPlayersByStateCityName(req, res)) // done
router.get('/player/verify-email/:playerId', [], (req, res) => PlayerController.verifyPlayerEmail(req, res)) // done
router.get('/player/block-player-account/:playerId', [], (req, res) => PlayerController.blockPlayerAccount(req, res)) // done
router.get('/player/unblock-player-account/:playerId', [], (req, res) => PlayerController.unblockPlayerAccount(req, res)) // done
router.post('/player/reset-password', [], (req, res) => PlayerController.resetPlayerAccountPassword(req, res)) // done
// --------------------------------------- END OF Player Routes ------------------------------------------- //

// Player Payments Method Routes
router.post('/player/create-payment-method', [], (req, res) => PlayerPaymentMethodController.createPlayerPaymentMethod(req, res)) // done
router.put('/player/update-payment-method', [], (req, res) => PlayerPaymentMethodController.updatePlayerPaymentMethod(req, res)) // done
router.delete('/player/delete-payment-method/:playerId/:methodId', [], (req, res) => PlayerPaymentMethodController.deletePlayerPaymentMethod(req, res)) // done
router.get('/player/get-payment-method-details/:playerId/:methodId', [], (req, res) => PlayerPaymentMethodController.getPaymentMethodDetails(req, res)) // done
router.get('/player/get-player-payment-methods/:playerId', [], (req, res) => PlayerPaymentMethodController.getPlayerPaymentMethods(req, res)) // done
router.get('/player/block-payment-method/:playerId/:methodId', [], (req, res) => PlayerPaymentMethodController.blockPlayerPaymentMethod(req, res)) //done
router.get('/player/unblock-payment-method/:playerId/:methodId', [], (req, res) => PlayerPaymentMethodController.unblockPlayerPaymentMethod(req, res)) // done
// ----------------------------------------- END OF Player Payment Routes -------------------------------------------------- //


// Court Owner Routes
router.post('/court-owner/login', [], (req, res) => CourtOwnerController.loginCourtOwner(req, res)) // done
router.post('/court-owner/create-court-owner', [], (req, res) => CourtOwnerController.createCourtOwnerAccount(req, res)) // done
router.put('/court-owner/update-court-owener', [], (req, res) => CourtOwnerController.updateCourtOwnerAccount(req, res)) // done
router.get('/court-owner/get-court-owner/:id', [], (req, res) => CourtOwnerController.getCourtOwnerByID(req, res)) // done
router.delete('/court-owner/delete-court-owner/:id', [], (req, res) => CourtOwnerController.deleteCourtOwnerAccount(req, res)) // done
// ------------------------------------------ End Of Court Owner Routes ------------------------------------------------ //


// Court Owner Payment Method Routes
router.post('/court-owner/create-payment-method', [], (req, res) => CourtOwnerPaymentMethodController.createCourtOwnerPaymentMethod(req, res)) // done
router.put('/court-owner/update-payment-method', [], (req, res) => CourtOwnerPaymentMethodController.updateCourtOwnerPaymentMethod(req, res)) // done
router.get('/court-owner/get-payment-methods/:courtOwnerId', [], (req, res) => CourtOwnerPaymentMethodController.getCourtOwnerPaymentMethods(req, res)) // done
router.get('/court-owner/block-payment-method/:methodId', [], (req, res) => CourtOwnerPaymentMethodController.blockCourtOwnerPaymentMethod(req, res)) // done
router.get('/court-owner/unblock-payment-method/:methodId', [], (req, res) => CourtOwnerPaymentMethodController.unblockCourtOwnerPaymentMethod(req, res)) // done
router.delete('/court-owner/delete-payment-method/:methodId', [], (req, res) => CourtOwnerPaymentMethodController.deleteCourtOwnerPaymentMethod(req, res)) // done
// ----------------------------------------- End of Court Owner Payment Routes ----------------------------------------------- //













// Court routes
router.post('/court/create-court', (req, res) => createCourt(req, res))
router.put('/court/update-court', (req, res) => updateCourt(req, res))
router.delete('/court/delete-court', (req, res) => deleteCourt(req, res)) // done
router.get('/court/get-courts-by-owner/:court_owner_id', (req, res) => getCourtsByCourtOwner(req, res))
router.get('/court/get-court/:court_id/:court_owner_id', (req, res) => getCourt(req, res))
router.get('/court/block-court/:court_id', (req, res) => blockCourt(req, res))
router.get('/court/unblock-court/:court_id', (req, res) => unblockCourt(req, res))
router.get('/court/search-courts/:sport/:date/:start_time/:location/:court_enviroment/:payment_type', [validator.query(searchValidation)], (req, res) => searchCourt(req, res))
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