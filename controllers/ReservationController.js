const Reservation = require('../models/').Reservation
const Slot = require('../models/').Slot

class ReservationController {

    static async createPayNowReservation(req, res) {
        try {
            const { slot_id } = req.body
            const slot = await Slot.slotInfo(slot_id)
            if (slot.active) {
                
                


                

                if (slot.result.slot_has_reservation) {
                    console.log(slot.result.slot_has_reservation)
                    console.log(slot.result.slot_reservation_id)
                    // TODO: Remove slot reservation and send notification to all players from that slot group
                }
                //const canCreateReservation = await Reservation.createReservationForSlot(req.body)

            } else {
                return res.status(200).json({
                    message: "Sorry slot is no longer available"
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = ReservationController