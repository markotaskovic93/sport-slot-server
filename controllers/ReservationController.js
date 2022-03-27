const Reservation = require('../models/').Reservation
const Slot = require('../models/').Slot
const PlayersInvitation = require('../models/').Reservation_players_invitation
const Player = require('../models/').Player
const PlayersTransaction = require('../models/').Players_transactions_history

class ReservationController {

    /**
     * Steps in direct slot reservation
     * 1. Check if slot is available (not booked, not blocked and active) -> done
     * 2. If slot is available, create reservation -> done
     * 3. If player invite players, add players to `reservation_players_invitation` otherwise skip that part -> done
     * 4. Make a payment, cut slot price from player account -> done
     * 5. Create payment transaction for player profile -> done
     * 6. Book slot and update slot with reservation id -> done
     * 7. If slot already have reservation, remove that reservation and send notification to all players from that slot 
     * 8. DONE !!!
     */
    static async createSlotReservation(req, res) {
        try {
            const { slot_id, players, player_id, reservation_type, players_needed } = req.body
            const playerBalance = await Player.getBalance(player_id)

            // Step 1.
            const slot = await Slot.slotInfo(slot_id)
            if (slot.active) {

                let reservationPrice
                if (reservation_type === "direct") {
                    reservationPrice = parseInt(slot.result.slot_price)
                    req.body.price_per_person = 0
                } else {
                    reservationPrice = parseInt(slot.result.slot_price) / parseInt(players_needed)
                    req.body.price_per_person = reservationPrice
                }

                if (playerBalance >= reservationPrice) {
                    
                    // Step 2.
                    const reservation = await Reservation.createReservationForSlot(req.body)
                    if (reservation.actionStatus) {
                        
                        // Step 3.
                        const playerInvitation = await PlayersInvitation.storePlayersInvitataion(slot_id, reservation.body.id, players)

                        // Step 4.
                        if (reservation_type === "direct") {

                            const updatedBalance = playerBalance - parseInt(slot.result.slot_price)
                            const updatingBalance = await Player.updatePlayerBalance({ player_id: player_id, balance: updatedBalance })
                            if (updatingBalance.actionStatus) {
    
                                // Step 5.
                                const transaction = await PlayersTransaction.createTransaction({
                                    player_id: player_id,
                                    transaction_type: "booking",
                                    transaction_desc: "Slot booking transation",
                                    transaction_time: `${new Date()}`,
                                    transaction_amount: slot.result.slot_price
                                })
    
                                if (transaction) {
                                    
                                    // Step 6. 
                                    const bookSlot = await Slot.directBookSlot(slot_id)

                                    if (bookSlot.actionStatus) {
                                        // Step 7.
                                        if (slot.result.slot_has_reservation) {
                                            const removePreviousReservation = await Reservation.removeReservation(slot.result.slot_reservation_id)
                                            if (removePreviousReservation) {
                                                
                                                //const removeReservationPlayers = await 
                                            }
                                        } 
                                        
                                        // Step 9.
                                        return res.status(200).json(bookSlot) // Woooohhoooo, slot is booked, you can play the fucking game !!!
                                    } else {
                                        return res.status(200).json({
                                            message: "Error rise while booking slot",
                                            messageCode: 502
                                        })
                                    }
                                } else {
                                    return res.status(200).json({
                                        message: "Error rise while creating transation",
                                        messageCode: 502
                                    })
                                }
                            } else {
                                return res.status(200).json({
                                    message: "Error rise while updating player balance",
                                    messageCode: 502
                                })
                            }

                        } else {
                            const bookSlot = await Slot.groupBookSlot(slot_id, reservation.body.id)
                            if (bookSlot.actionStatus) {
                                return res.status(200).json(bookSlot) // Woooohhoooo, slot is booked, you can play the fucking game !!!
                            } else {
                                return res.status(200).json({
                                    message: "Error rise while booking group slot",
                                    messageCode: 502
                                })
                            }
                        }
                    } else {
                        return res.status(200).json({
                            message: "Error rised while creating slot reservation",
                            messageCode: 500
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "sorry you don't have enough funds in the account",
                        messageCode: 501
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Sorry slot is no longer available",
                    messageCode: 499
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = ReservationController