const Slot_reservation = require('../models/').Slot_reservation
const IDGenerator = require('../helpers/IDGenerator.js')

const {
    checkIfCourtSlotIsBooked
} = require('./CourtSlotCotroller.js')

const {
    invitePlayersToSlot
} = require('./SlotPlayersController.js')


const createSlotReservation = async (req, res) => {
    try {
        const { courtSlotID, playerID, playersNeeded, playersToInvite, pricePerPerson } = req.body
        const slotIsBooked = await checkIfCourtSlotIsBooked(courtSlotID)
        const isTryToBookSameSlot = await checkIfPlayerAlreadyTryToBookSameSlot(playerID, courtSlotID)
        if(!slotIsBooked) {
            if(!isTryToBookSameSlot) {
                const slotReservationID = IDGenerator()
                const slotReservation = await Slot_reservation.create({
                    id: slotReservationID,
                    court_slot_id: courtSlotID,
                    admin_player_id: playerID,
                    players_needed: playersNeeded,
                    players_accepted: 1,
                    reservation_status: 'open',
                    blocked: false
                }).then(() => {
                    return {
                        actionStatus: true
                    }
                }).catch(() => {
                    return {
                        actionStatus: false
                    }
                })
                if(slotReservation.actionStatus) {
                    if(playersToInvite.length > 0) {
                        const inviteActionStatus = await invitePlayersToSlot(playersToInvite, slotReservationID, pricePerPerson)
                        if(inviteActionStatus) {
                            return res.status(200).json({
                                message: 'Slot is fully reserved'
                            })
                        } else {
                            return res.status(400).json({
                                message: 'Slot is reserved without players'
                            })
                        }
                    }
                    return
                } else {
                    return res.status(400).json({
                        message: 'Error occurs when try to reserve slot'
                    })
                }
            } else {
                return res.status(400).json({
                    message: "You already try to book this court slot"
                })
            }
        } else {
            return res.status(400).json({
                message: "Court slot is already booked"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error slot reservation',
            error
        })
    }
}

const checkIfPlayerAlreadyTryToBookSameSlot = async (playerID, slotID) => {
    try {
        const playerTryToBookAgain = await Slot_reservation.findAll({
            where: {
                admin_player_id: playerID,
                court_slot_id: slotID
            }
        })
        return playerTryToBookAgain.length === 0 ? false : true
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            error
        })
    }
}



module.exports = {
    createSlotReservation
}