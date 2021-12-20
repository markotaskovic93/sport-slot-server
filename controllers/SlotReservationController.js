const Slot_reservation = require('../models/').Slot_reservation
const IDGenerator = require('../helpers/IDGenerator.js')

const createReservation = async (req, res) => {
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
// TODO: I need to think more about what I can actually update here
// const updateSlotReservation = async (req, res) => {
//     try {
//         const { slotID, courtID, playerID } = req.body
//         const slot = await Slot_reservation.findByPk()
//     } catch (error) {
//         return res.status(400).json({
//             actionStatus: "Error",
//             error
//         })
//     }
// } 

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
    createReservation,
    changeStatusOfSlotReservation,
    removeSlotReservation
}