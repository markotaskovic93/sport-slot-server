const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation_players_invitation extends Model {
        
        static async storePlayersInvitataion(reservation_id, players) {
            try {
                if (players.length > 0) {
                    let res
                    for(let i = 0; i < players.length; i++) {
                        const invitationID = IDGenerator()
                        await sequelize.transaction((t) => {
                            return Reservation_players_invitation.create({
                                id: invitationID,
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

        static async getReservationInvitationPlayers(reservationID) {
            try {
                return Reservation_players_invitation.findAll({
                    where: {
                        reservation_id: reservationID
                    },
                    raw: true,
                    attributes: ['player_id']
                }).then(result => {
                    return result ? result : []
                }).catch(() => {
                    return []
                })
            } catch (error) {
                return []
            }
        }

        static async removeReservationInvitations(reservationID) {
            try {
                return Reservation_players_invitation.destroy({
                    where: {
                        reservation_id: reservationID
                    }
                }).then(result => {
                    return result == 1 ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return false   
            }
        }

        static async removePlayerInvitation(playerID, reservationID) {
            try {
                return Reservation_players_invitation.destroy({
                    where: {
                        reservation_id: reservationID,
                        player_id: playerID
                    }
                }).then(result => {
                    return result == 1 ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return false
            }
        }

    };
    Reservation_players_invitation.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Reservation_players_invitation',
    });
    return Reservation_players_invitation;
};