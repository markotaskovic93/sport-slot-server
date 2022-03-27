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
const CourtController = require('../controllers/CourtController.js')
const SlotController = require('../controllers/SlotController.js')
const ReservationController = require('../controllers/ReservationController.js')
const FeeController = require('../controllers/FeeController.js')


// Player Routes
router.post('/player/login', [], (req, res) => PlayerController.loginPlayer(req, res)) // done
router.post('/player/create-player', [validator.body(createPlayerValidation)], (req, res) => PlayerController.createPlayerAccount(req, res)) // done
router.put('/player/update-player', [validator.query(updatePlayerValidation)], (req, res) => PlayerController.updatePlayerAccount(req, res)) // done
router.get('/player/get-player/:id', [validator.query(getPlayerByID)], (req, res) => PlayerController.getPlayer(req, res)) // done
router.delete('/player/delete-player/:id', [], (req, res) => PlayerController.deletePlayerAccount(req, res)) // done
router.get('/player/find-players/:state/:city/:full_name?', [], (req, res) => PlayerController.findPlayersByStateCityName(req, res)) // done
router.get('/player/verify-email/:playerId', [], (req, res) => PlayerController.verifyPlayerEmail(req, res)) // done
router.get('/player/block-player-account/:playerId', [], (req, res) => PlayerController.blockPlayerAccount(req, res)) // done
router.get('/player/unblock-player-account/:playerId', [], (req, res) => PlayerController.unblockPlayerAccount(req, res)) // done
router.post('/player/reset-password', [], (req, res) => PlayerController.resetPlayerAccountPassword(req, res)) // done
router.put('/player/notification-settings', [], (req, res) => PlayerController.updateNotificationSettings(req, res)) // 
router.put('/player/update-balance', [], (req, res) => PlayerController.updateBalance(req, res)) //
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






// Court Routes
router.post('/court/create-court', [], (req, res) => CourtController.createCourt(req, res)) //
router.put('/court/update-court', [], (req, res) => CourtController.updateCourtData(req, res)) // 
router.get('/court/get-court/:court_id', [], (req, res) => CourtController.getCourt(req, res)) //

// Slot routes
router.post('/court-slot/create-slot', [], (req, res) => SlotController.createSlots(req, res)) // radi dodavanje niza slotova za jedan court
router.get('/court-slot/get-slots-count/:date/:time/:city/:state/:sport?/:bookingType?', [], (req, res) => SlotController.getSlotsCount(req, res)) // sredjeno
router.get('/court-slot/get-slots/:date/:time/:city/:state/:sport?/:bookingType?/:offset', [], (req, res) => SlotController.findSlots(req, res)) // filtering slots

// Reservation routes
router.post('/reservation/pay-now-reservation', [], (req, res) => ReservationController.createSlotReservation(req, res)) // create pay now reservation

// Fees routes
router.post('/fee/create-fee', [], (req, res) => FeeController.createSlotFee(req, res)) // add fees

module.exports = router