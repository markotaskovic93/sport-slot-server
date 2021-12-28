const Slot_player = require('../models/').Slot_player
const IDGenerator = require('../helpers/IDGenerator.js')
const {
    updateConfirmedPlayersInSlotReservation
} = require('./SlotReservationController.js')

const sendInviteToPlayer = async (req, res) => {
    try {
        const { slotID, playerID, inviteStatus, slotPrice } = req.body
        const slotPlayer = await checkIfPlayerExistInSlot(slotID, playerID)
      
        if(!slotPlayer) {
            const slotPlayerID = IDGenerator()
            return await Slot_player.create({
                id: slotPlayerID,
                slot_id: slotID,
                player_id: playerID,
                invite_status: inviteStatus,
                invitation_responded: false,
                slot_price: slotPrice
            })
            .then(response => {
                return res.status(200).json({
                    actionMessage: 'Player added to slot',
                    response
                })
            })
            .catch(error => {
                return res.status(400).json({
                    actionMessage: 'Player is not added',
                    error
                })
            })
        } else {
            return res.status(400).json({
                actionMessage: 'Player already exist in this slot'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const respondToInvite = async (req, res) => {
    try {
        const { slotID, playerID, inviteStatus } = req.params
        const playerExist = await checkIfPlayerExistInSlot(slotID, playerID)
        if(playerExist) {
            return await Slot_player.update({
                invite_status: inviteStatus,
                invitation_responded: true // this field gives us the answer whether the player responded to the invite
            }, {
                where: {
                    slot_id: slotID,
                    player_id: playerID
                }
            })
            .then(response => {
                if(inviteStatus) {
                    const da = updateConfirmedPlayersInSlotReservation(slotID)
                } else {
                    return res.status(200).json({
                        actionMessage: 'Player decline invitation',
                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    actionMessage: 'Player had a problem with respose',
                    error
                })
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const cancelPlayerSlotConfirmation = (req, res) => {
    try {
        
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const checkIfPlayerExistInSlot = async (slotID, playerID) => {
    try {
        return await Slot_player.findOne({
            where: {
                slot_id: slotID,
                player_id: playerID
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        }) 
    }
}

module.exports = {
    sendInviteToPlayer,
    respondToInvite
}