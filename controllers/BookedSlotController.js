const Booked_slot = require('../models/').Booked_slot

const bookSlot = async (slotData) => {
    try {
        console.log("slotData: ", slotData)
        // return await Booked_slot.create({
        //     id: ID,
        //     court_id: courtID,
        //     slot_id: slotID,
        //     player_id: playerID,
        //     players_needed: playersNeeded,
        //     confirmed_players: confirationNum,
        //     reservation_status: reserveStatus,
        //     blocked: blocked
        // })
        // .then(() => {
        //     return true
        // })
        // .catch(() => {
        //     return false
        // })
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

module.exports = {
    bookSlot
}