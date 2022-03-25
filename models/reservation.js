const { Model } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        
        static async createReservationForSlot(data) {
            try {
                const { admin_player_id, slot_id, sport, players_needed, players_accepted } = data
                const reservationID = IDGenerator()
                return Reservation.create({
                    id: reservationID,
                    slot_id: slot_id,
                    admin_player_id: admin_player_id,
                    sport: sport,
                    players_needed: players_needed,
                    players_accepted: players_accepted,
                    is_paid: false
                }, {
                    raw: true
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Reservation created",
                        body: result
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating reservation",
                        body: err
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

    };
    Reservation.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        slot_id: DataTypes.BIGINT,
        admin_player_id: DataTypes.STRING,
        players_needed: DataTypes.STRING,
        players_accepted: DataTypes.STRING,
        sport: DataTypes.STRING,
        is_paid: DataTypes.BOOLEAN,
        price_per_person: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};