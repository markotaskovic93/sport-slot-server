const Reservation = require('../models/').Reservation
const Slot = require('../models/').Slot
const PlayersInvitation = require('../models/').Reservation_players_invitation

class ReservationController {

    static async createPayNowReservation(req, res) {
        try {
            const { slot_id, players } = req.body

            // Step 1.
            const slot = await Slot.slotInfo(slot_id)
            if (slot.active) {
                
                // Step 2.
                const reservation = await Reservation.createReservationForSlot(req.body)
                if (reservation.actionStatus) {
                    /**
                     * Steps in direct slot reservation
                     * 1. Check if slot is available (not booked, not blocked and active)
                     * 2. If slot is available, create reservation
                     * 3. If player invite players, add players to `reservation_players_invitation` otherwise skip that part
                     * 4. Make a payment, cut slot price from player account
                     * 5. Create payment transaction for player profile
                     * 6. Create payment transaction for court
                     * 7. Book slot and update slot with reservation id
                     * 8. If slot already have reservation, remove that reservation and send notification to all players from that slot
                     * 9. DONE !!!
                     */

                    // Step 7. 
                    const bookSlot = await Slot.bookSlot(slot_id, reservation.body.id)
                    if (bookSlot.actionStatus) {

                        // Step 8.
                        if (slot.result.slot_has_reservation) {
                            
                        } else {
                            // Step 9.
                            return res.status(bookSlot.actionStatus).json(bookSlot) // Woooohhoooo, slot is booked, you can play the fucking game !!!
                        }
                    } else {

                    }
                } else {
                    return res.status(200).json({
                        message: "Error rised while creating slot reservation",
                        messageStatus: 500
                    })
                }
                
                
                
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