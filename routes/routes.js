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
const SlotReservationController = require('../controllers/SlotReservationController.js')


// const {
//     respondToInvitation
// } = require('../controllers/SlotPlayersController.js');
// const { route } = require('express/lib/application');


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
router.get('/court/get-courts-by-court-owner/:court_owner_id', [], (req, res) => CourtController.getCourts(req, res)) //
router.delete('/court/delete-court/:court_id', [], (req, res) => CourtController.deleteCourt(req, res)) //
router.put('/court/block-court', [], (req, res) => CourtController.blockCourt(req, res)) // 
router.put('/court/unblock-court', [], (req, res) => CourtController.unblockCourt(req, res)) //
router.put('/court/promote-court', [], (req, res) => CourtController.promoteCourt(req, res)) //
router.put('/court/remove-promotion', [], (req, res) => CourtController.removePromotion(req, res)) //
router.get('/court/search-court', [], (req, res) => CourtController.searchCourts()) // 
// ------------------------------------------ End Of Court Routes ------------------------------------------------------ //


// Slot Routes
router.post('/slot/create-slot', [], (req, res) => SlotController.createSlot(req, res)) //
router.delete('/slot/remove-slot', [], (req, res) => SlotController.removeSlot(req, res)) //
router.put('/slot/block-slot', [], (req, res) => SlotController.blockSlot(req, res)) //
router.put('/slot/unblock-slot', [], (req, res) => SlotController.unblockSlot(req, res)) //
router.get('/slot/get-slot/:slot_id', [], (req, res) => SlotController.getSlot(req, res)) //
router.get('/slot/get-slots/:court_id', [], (req, res) => SlotController.getSlots(req, res)) //
router.put('/slot/book-slot', [], (req, res) => SlotController.bookSlotByAdminPlayer(req, res)) //
router.put('/slot/unbook-slot', [], (req, res) => SlotController.unbookSlotByAdminPlayer(req, res)) //
// ------------------------------------------- End of Slot Routes ------------------------------------------------------ //


// Slot Reservations
router.post('/slot-reservation/create-slot-reservation', [], (req, res) => SlotReservationController.createSlotReservation(req, res)) //
router.get('/slot-reservation/get-slot-reservations/:player_id', [], (req, res) => SlotReservationController.getMySlotReservations(req, res)) //
//router.get('/slot-reservation/get-slot-reservations/:reservation_id/:player_id', [], (req, res) => SlotReservationController.getSlotReservations(req, res)) //
router.put('/slot-reservation/replace-admin-player', [], (req, res) => SlotReservationController.replaceAdminPlayer(req, res)) //
router.delete('/slot-reservation/delete-slot-reservation/:reservation_id/:player_id', [], (req, res) => SlotReservationController.deleteSlotReservation(req, res)) // 

module.exports = router