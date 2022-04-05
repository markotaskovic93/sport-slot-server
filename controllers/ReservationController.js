const Reservation = require('../models/').Reservation
const Slot = require('../models/').Slot
const PlayersInvitation = require('../models/').Reservation_players_invitation
const PlayersRequests = require('../models/').Reservation_players_requests
const Player = require('../models/').Player
const PlayersTransaction = require('../models/').Players_transactions_history
const ReservationPlayers = require('../models/').Reservation_players
const PlayersNotificaiton = require('../models/').Players_notification

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
                    req.body.price_per_person = reservationPrice.toFixed()
                }

                if (playerBalance.balance >= reservationPrice) {
                    
                    if (slot.result.slot_has_reservation && reservation_type === "direct") {

                        // get all players to send notification
                        const reservationPlayersReq = await PlayersRequests.getReservationReqPlayers(slot.result.slot_reservation_id)
                        const reservationInvitationPlayers = await PlayersInvitation.getReservationInvitationPlayers(slot.result.slot_reservation_id)
                        const reservationPlayers = await ReservationPlayers.getReservationPlayers(slot.result.slot_reservation_id)

                        await PlayersRequests.removeReservationRequests(slot.result.slot_reservation_id)
                        await PlayersInvitation.removeReservationInvitations(slot.result.slot_reservation_id)
                        await ReservationPlayers.removeReservationInvitations(slot.result.slot_reservation_id)

                        const notificationData = {
                            slotID: slot_id,
                            reservationID: slot.result.slot_reservation_id,
                            notificationType: "cancelation-by-booking",
                            notificationDesc: "Sorry slot you try to book is booked"
                        }

                        if (reservationPlayersReq) {
                            for(let i = 0; i < reservationPlayersReq.length; i++) {
                                notificationData.playerID = reservationPlayersReq[i].player_id
                                const response = await PlayersNotificaiton.createNotification(notificationData)
                                if(response) {
                                    // WS notification service
                                }
                            }
                        }
                        if (reservationInvitationPlayers) {
                            for(let i = 0; i < reservationInvitationPlayers.length; i++) {
                                notificationData.playerID = reservationInvitationPlayers[i].player_id
                                const response = await PlayersNotificaiton.createNotification(notificationData)
                                if(response) {
                                    // WS notification service
                                }
                            }
                        }
                        if (reservationPlayers) {
                            for(let i = 0; i < reservationPlayers.length; i++) {
                                notificationData.playerID = reservationPlayers[i].player_id
                                const response = await PlayersNotificaiton.createNotification(notificationData)
                                if(response) {
                                    // WS notification service
                                }
                            }
                        }
                        await Reservation.removeReservation(slot.result.slot_reservation_id)
                    }

                    // Step 2.
                    const reservation = await Reservation.createReservationForSlot(req.body)
                    // const reservation = {
                    //     actionStatus: false
                    // }
                    if (reservation.actionStatus) {
                        
                        await PlayersInvitation.storePlayersInvitataion(reservation.body.id, players)

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
                                    await ReservationPlayers.addPlayerToReservation(reservation.body.id, player_id)
                                    const bookSlot = await Slot.directBookSlot(slot_id)
                                    if (bookSlot.actionStatus) {
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
                                await ReservationPlayers.addPlayerToReservation(reservation.body.id, player_id)
                                return res.status(200).json(bookSlot)
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