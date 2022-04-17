const Slot = require('../models/').Slot
const Court = require('../models/').Court
const Fee = require('../models/').Fee
const Reservation = require('../models/').Reservation

class SlotController {

    static async createSlots(req, res) {
        try {
            const { court_id } = req.body.slots[0]
            const courtIsAvailable = await Court.courtIsAvailable(court_id)
            if (courtIsAvailable.status) {
                const applayedFee = await Fee.getFees() 
                const response = await Slot.storeSlots(req.body, courtIsAvailable.result.court_available_sports, applayedFee[0].slot_base_fee)
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async findSlots(req, res) {
        try {
            const slots = await Slot.filterSlots(req.params)
            for(let i = 0; i < slots.body.length; i++) {
                const courtInfo = await Court.getCourtInfo(slots.body[i].court_id)
                slots.body[i].court_info = courtInfo.body
                if (slots.body[i].slot_has_reservation) {
                    const slotReservation = await Reservation.getSlotReservation(slots.body[i].id)
                    slots.body[i].reservation = slotReservation
                } else {
                    slots.body[i].reservation = null
                }
            }
            return res.status(200).json(slots)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getSlotsCount(req, res) {
        try {
            const response = await Slot.getNumberOfSlots(req.params)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    // Ostaje
    static async bookSlot(slotId) {
        try {
            const response = await Slot.bookSlot(slotId)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    // Ostaje
    static async unbookSlot(slotId) {
        try {
            const response = await Slot.unbookSlot(slotId)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = SlotController