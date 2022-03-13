const Slot_reservation = require('../models/').Slot_reservation

class SlotReservationController {

    static async createSlotReservation(req, res) {
        try {
            const response = await Slot_reservation.createReservation(req.body)
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

    static async getMySlotReservations(req, res) {
        try {
            const response = await Slot_reservation.getMySlotReservations(req.params)
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

    static async deleteSlotReservation(req, res) {
        try {
            const response = await Slot_reservation.deleteReservation(req.params)
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