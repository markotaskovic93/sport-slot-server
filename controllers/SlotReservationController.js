const Slot_reservation = require('../models/').Slot_reservation

class SlotReservationController {

    static async createSlotReservation(req, res) {
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

    static async updateSlotReservation(req, res) {
        try {
            const response = await Slot.updateReservation(req.body)
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

    static async getSlotReservation(req, res) {
        try {
            const response = await Slot.getReservation(req.params)
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

    static async getSlotReservations(req, res) {
        try {
            const response = await Slot.getReservations(req.params)
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

    static async replaceAdminPlayer(req, res) {
        try {
            const response = await Slot.replaceAdminPlayer(req.body)
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
            const response = await Slot.deleteReservation(req.params)
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