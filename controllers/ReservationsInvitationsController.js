const PlayersInvitation = require('../models').Reservation_players_invitation
const Reservation = require('../models/').Reservation
const ReservationPlayers = require('../models/').Reservation_players

class ReservationsInvitationsController {

    static async respondToInvitation(req, res) {
        try {
            const { reservation_id, player_id, action } = req.params
            const reservation = await Reservation.getReservationIfActive(reservation_id)
            console.log(reservation)
            if (reservation) {
                if (action === 'accept') {
                    if (reservation.reservation_type === 'group') {
                        const currentNumberOfAcceptedPlayers = parseInt(reservation.player_accepted) + 1
                        const addPlayerToReservation = await ReservationPlayers.addPlayerToReservation(reservation_id, player_id)

                        if (addPlayerToReservation) {
                            const updateReservationPlayersAccepted = await Reservation.updatePlayersAccepted(reservation_id, currentNumberOfAcceptedPlayers)
                            if (updateReservationPlayersAccepted) {
                                return res.status(200).json({
                                    message: "You accept slot invitation",
                                    code: 323
                                })
                            }
                        }
                        if (reservation.players_needed == currentNumberOfAcceptedPlayers) {
                            // book slot 
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
                    // remove that invitation
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