const Slot = require('../models/').Slot
const Court = require('../models/').Court

class SlotController {

    static async createSlots(req, res) {
        try {
            const response = await Slot.storeSlots(req.body)
            return res.status(200).json(response)
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

    static async findInitialSlots(req, res) {
        try {
            const slots = await Slot.filterSlots(req.params)
            for(let i = 0; i < slots.body.length; i++) {
                const courtInfo = await Court.getCourtFilterInfo(slots.body[i].court_id)
                slots.body[i].court_info = courtInfo.body
            }
            return res.status(200).json(slots)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async getSlotsCount(req, res) {
        try {
            const response = await Slot.getNumberOfSlots(req.params)
            return res.status(200).json(response)
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

}

module.exports = SlotController