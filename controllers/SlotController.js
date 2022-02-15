const Slot = require('../models/').Slot

class SlotController {

    static async createSlots(req, res) {
        try {
            const response = await Slot.storeSlots(req.body)
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

    static async removeSlot(req, res) {
        try {
            const response = await Slot.removeSlotByCourt(req.params)
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

    static async blockSlot(req, res) {
        try {
            const response = await Slot.blockSlotByCourt(req.body)
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

    static async unblockSlot(req, res) {
        try {
            const response = await Slot.unblockSlotByCourt(req.body)
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

    static async getSlot(req, res) {
        try {
            const response = await Slot.getSlotById(req.params)
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

    static async getSlots(req, res) {
        try {
            const response = await Slot.getSlotsByCourt(req.params)
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

    static async bookSlot(slotId) {
        try {
            const response = await Slot.setSlotBooked(slotId)
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

    static async bookSlotByAdminPlayer(req, res) {
        try {
            const { slot_id } = req.params
            const response = await Slot.setSlotBooked(slot_id)
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

    static async unbookSlot(slotId) {
        try {
            const response = await Slot.unbookSlot(slotId)
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

    static async unbookSlotByAdminPlayer(req, res) {
        try {
            const { slot_id } = req.params
            const response = await Slot.unbookSlot(slot_id)
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

module.exports = SlotController