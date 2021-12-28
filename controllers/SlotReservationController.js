const Slot_reservation = require('../models/').Slot_reservation
const IDGenerator = require('../helpers/IDGenerator.js')

const {
    bookSlot
} = require('./BookedSlotController.js')

const createSlotReservation = async (req, res) => {
    try {
        const { courtID, slotID, playerID, playersNeeded, status, blocked } = req.body
        const slot = await Slot_reservation.findOne({
            where: {
                slot_id: slotID,
                court_id: courtID,
                player_id: playerID
            }
        })
        if(!slot) {
            const slotReservationID = IDGenerator()
            return await Slot_reservation.create({
                id: slotReservationID,
                court_id: courtID,
                slot_id: slotID,
                player_id: playerID,
                players_needed: playersNeeded,
                confirmed_players: 0,
                reservation_status: status,
                blocked: blocked
            })
            .then(response => {
                return res.status(200).json({
                    actionStatus: "Success",
                    response
                })
            })
            .catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: "Slot is already reserved."
            })
        }
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

const getSlotReservationBySlot = async (req, res) => {
    try {
        return await Slot_reservation.findAll({
            where: {
                slot_id: req.params.id 
            }
        })
        .then(response => {
            return res.status(400).json(response)
        })
        .catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

const updateConfirmedPlayersInSlotReservation = async (slotID) => {
    try {
        const slotReservation = await Slot_reservation.findByPk(slotID)
        const currentNumOfConfirmation = slotReservation.confirmed_players
        const playerNeeded = slotReservation.players_needed
        if (slotReservation) {
            if (currentNumOfConfirmation < playerNeeded) {
                currentNumOfConfirmation += 1
                const confirmationStatus = await updatePlayerConfirmation(slotID, currentNumOfConfirmation)
                if(confirmationStatus && currentNumOfConfirmation === playerNeeded) {                        
                    //TODO: send slot reservation in bookedSlot table and book reservation
                    slotReservation.confirmed_players = currentNumOfConfirmation
                    const bookSlot = await bookSlot(slotReservation)
                    
                } else {
                    return res.status(200).json({
                        message: "Error with updating confirmation"
                    })
                }
            } else {
                return res.status(200).json({
                    message: "You are late, slot is already booked"
                })
            }
        } else {
            return res.status(400).json({
                message: "Slot reservation doesn't exists"
            })
        }
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

const updatePlayerConfirmation = async (slotID, numberOfConfirmation) => {
    try {
        return await Slot_reservation.update({
            confirmed_players: numberOfConfirmation
        }, {
            where: {
                id: slotID
            }
        })
        .then(response => {
            return true
        })
        .catch(error => {
            return false
        })
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

const changeStatusOfSlotReservation = async (slotData) => {
    try {
        const { slotID, courtID, playerID, status } = slotData
        const slot = await Slot_reservation.findByPk(slotID)
        if(slot) {
            return await Slot_reservation.update({
                reservation_status: status
            }, {
                where: {
                    slot_id: slotID,
                    court_id: courtID,
                    player_id: playerID
                }
            })
            .then(response => {
                return res.status(200).json({
                    actionMessage: "Status is updated.",
                    response
                })
            })
        } else {
            return res.status(400).json({
                actionMessage: "Slot doesn't exist in collection"
            })
        }
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

const removeSlotReservation = async (req, res) => {
    try {
        const { slotID, courtID, playerID } = req.body
        return await Slot_reservation.destroy({
            where: {
                slot_id: slotID,
                court_id: courtID,
                player_id: playerID
            }
        })
        .then(response => {
            return res.status(200).json({
                actionMessage: "Slot is successfully removed from collection",
                response
            })
        })
        .catch(error => {
            return res.status(400).json({
                actionMessage: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(400).json({
            actionStatus: "Error",
            error
        })
    }
}

module.exports = {
    createSlotReservation,
    getSlotReservationBySlot,
    changeStatusOfSlotReservation,
    removeSlotReservation,
    updateConfirmedPlayersInSlotReservation
}