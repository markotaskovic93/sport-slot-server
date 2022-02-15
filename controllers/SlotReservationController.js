const Slot_reservation = require('../models/').Slot_reservation

class SlotReservationController {

    static async createSlotReservation() {
        try {
            const response = await Slot.storeSlotsReservation(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

}

module.exports = SlotReservationController