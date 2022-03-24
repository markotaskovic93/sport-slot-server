const Slot = require('../models/').Slot
const Court = require('../models/').Court

class SlotController {

    static async createSlots(req, res) {
        try {
            const { court_id } = req.body.slots[0]
            const courtIsAvailable = await Court.courtIsAvailable(court_id)
            if (courtIsAvailable.status) {
                const response = await Slot.storeSlots(req.body, courtIsAvailable.result.court_available_sports)
                return res.status(200).json(response)
            }
        } catch (error) {
            return req.status(500).json(error)
        }
    }

    static async findSlots(req, res) {
        try {
            const slots = await Slot.filterSlots(req.params)
            for(let i = 0; i < slots.body.length; i++) {
                const courtInfo = await Court.getCourtInfo(slots.body[i].court_id)
                slots.body[i].court_info = courtInfo.body
            }
            return res.status(200).json(slots)
        } catch (error) {
            return req.status(500).json(error)
        }
    }

    static async getSlotsCount(req, res) {
        try {
            const response = await Slot.getNumberOfSlots(req.params)
            return res.status(200).json(response)
        } catch (error) {
            return req.status(500).json(error)
        }
    }

    // Ostaje
    static async bookSlot(slotId) {
        try {
            const response = await Slot.bookSlot(slotId)
            return res.status(response.status).json(response)
        } catch (error) {
            return req.status(500).json(error)
        }
    }

    // Ostaje
    static async unbookSlot(slotId) {
        try {
            const response = await Slot.unbookSlot(slotId)
            return res.status(response.status).json(response)
        } catch (error) {
            return req.status(500).json(error)
        }
    }

}

module.exports = SlotController