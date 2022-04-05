const PlayersInvitation = require('../models').Reservation_players_invitation
const Reservation = require('../models/').Reservation
const ReservationPlayers = require('../models/').Reservation_players
const Player = require('../models/').Player
const Slot = require('../models/').Slot
const PlayersNotificaiton = require('../models/').Players_notification

class ReservationsInvitationsController {

    static async respondToInvitation(req, res) {
        try {
            const { reservation_id, player_id, action } = req.params
            const reservation = await Reservation.getReservationIfActive(reservation_id)
            
            if (reservation) {
                
                if (action === 'accept') {
                    
                    if (reservation.reservation_type === 'group') {
                        const playerBalance = await Player.getBalance(player_id)

                        if (parseInt(playerBalance.balance) >= parseInt(reservation.price_per_person)) {
                            const currentNumberOfAcceptedPlayers = parseInt(reservation.players_accepted) + 1
                            const addPlayerToReservation = await ReservationPlayers.addPlayerToReservation(reservation_id, player_id)

                            if (addPlayerToReservation) {
                                await PlayersInvitation.removePlayerInvitation(player_id, reservation_id)

                                const updateReservationPlayersAccepted = await Reservation.updatePlayersAccepted(reservation_id, currentNumberOfAcceptedPlayers)
                                
                                if (updateReservationPlayersAccepted) {
                                    if (reservation.players_needed == currentNumberOfAcceptedPlayers) {
                                        const bookSlotWithGroup = await Slot.bookSlotByGroup(reservation.slot_id)
                                        if (bookSlotWithGroup) {
                                            const reservationPlayers = await ReservationPlayers.getReservationPlayers(reservation_id)
                                            const notificationData = {
                                                slotID: reservation.slot_id,
                                                reservationID: reservation_id,
                                                notificationType: "booking-success",
                                                notificationDesc: "Congrats you ara a part of slot"
                                            }
                                            if (reservationPlayers) {
                                                for(let i = 0; i < reservationPlayers.length; i++) {
                                                    notificationData.playerID = reservationPlayers[i].player_id
                                                    await PlayersNotificaiton.createNotification(notificationData)
                                                }
                                            }
                                            return res.status(200).json({
                                                message: "You accept slot invitation",
                                                code: 323
                                            })
                                        }
                                    } else {
                                        return res.status(200).json({
                                            message: "You accept slot invitation",
                                            code: 324
                                        })
                                    }
                                }
                            }
                        } else {
                            return res.status(200).json({
                                message: "Update balance first",
                                code: 350
                            })
                        }
                    } else {
                        const addPlayerToReservation = await ReservationPlayers.addPlayerToReservation(reservation_id, player_id)
                        if (addPlayerToReservation) {
                            return res.status(200).json({
                                message: "You accept slot invitation",
                                code: 323
                            })
                        }
                    }
                } else {
                    await PlayersInvitation.removePlayerInvitation(player_id, reservation_id)
                    return res.status(200).json({
                        message: "You decline slot invitation",
                        code: 324
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Reservation is no longer available",
                    code: 300
                })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = ReservationsInvitationsController