const Slot_player = require('../models/').Slot_player
const Slot_reservation = require('../models/').Slot_reservation
const IDGenerator = require('../helpers/IDGenerator.js')

const invitePlayersToSlot = async (players, slotReservationID, slotPricePerPerson) => {
    try {
        let response = false
        for(let i = 0; i < players.length; i++) {
            let slotPlayerID = IDGenerator()
            await Slot_player.create({
                id: slotPlayerID,
                slot_reservation_id: slotReservationID,
                player_id: players[i],
                invitation_status: false,
                invitation_responded: false,
                price: slotPricePerPerson
            })
            .then(resp => {
                response = true
            })
            .catch(error => {
                response = false
            })
        }
        return response
    } catch (error) {
        return error
    }
}

const respondToInvitation = async (req, res) => {
    try {
        const { invitationResponse, slotReservationID, playerID } = req.body
        const availablePlayerSlots = await Slot_reservation.findAll({
            where: {
                id: slotReservationID 
            },
            attributes: ['players_needed', 'players_accepted'],
            raw: true 
        })
        .then(response => {
            return response[0].players_needed - response[0].players_accepted
        })
        .catch(error => {
            console.log(error)
        })
        if (availablePlayerSlots > 0) {
            return await Slot_player.update({
                invitation_status: invitationResponse,
                invitation_responded: true
            }, {
                where: {
                    slot_reservation_id: slotReservationID,
                    player_id: playerID
                }
            })
            .then(resp => {
                return res.status(200).json({
                    message: 'success'
                })
            })
            .catch(error => {
                return res.status(400).json({
                    message: 'Error',
                    error
                })
            })
        } 
        return res.status(400).json({
            message: 'Your invitation expired'
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            error
        })
    }
}

// const getPlayersBySlot = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

module.exports = {
    invitePlayersToSlot,
    respondToInvitation
}