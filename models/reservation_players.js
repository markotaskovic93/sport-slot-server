const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation_players extends Model {
        
        static async addPlayerToReservation(reservation_id, player_id) {
            try {
                const generateID = IDGenerator()
                await sequelize.transaction((t) => {
                    return Reservation_players.create({
                        id: generateID,
                        reservation_id: reservation_id,
                        player_id: player_id
                    })
                }).then(result => {
                    return result ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return false
            }
        }

        static async getReservationPlayers(reservationID) {
            try {
                return Reservation_players.findAll({
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

        static async removeReservationPlayers(reservationID) {
            try {
                return Reservation_players.destroy({
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

    };
    Reservation_players.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT
        }, {
        sequelize,
        modelName: 'Reservation_players',
    });
    return Reservation_players;
};