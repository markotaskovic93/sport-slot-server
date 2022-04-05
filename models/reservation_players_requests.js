const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Reservation_players_requests extends Model {

        static async getReservationReqPlayers(reservationID) {
            try {
                return Reservation_players_requests.findAll({
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

        static async removeReservationRequests(reservationID) {
            try {
                return Reservation_players_requests.destroy({
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
    Reservation_players_requests.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT
        }, {
        sequelize,
        modelName: 'Reservation_players_requests',
    });
    return Reservation_players_requests;
};