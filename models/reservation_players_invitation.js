const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation_players_invitation extends Model {
        
        static async storePlayersInvitataion(slot_id, reservation_id, players) {
            try {
                if (players.length > 0) {
                    let res
                    for(let i = 0; i < players.length; i++) {
                        const invitationID = IDGenerator()
                        await sequelize.transaction((t) => {
                            return Reservation_players_invitation.create({
                                id: invitationID,
                                slot_id: slot_id,
                                reservation_id: reservation_id,
                                player_id: players[i]
                            })
                        }).then(() => {
                            res = true
                        }).catch(() => {
                            res = false
                        })
                    }
                    return res
                }
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Error while creating player invitation",
                    body: err
                }
            }
        }

    };
    Reservation_players_invitation.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        slot_id: DataTypes.BIGINT,
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Reservation_players_invitation',
    });
    return Reservation_players_invitation;
};