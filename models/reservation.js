const { Model } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        
        static async createReservationForSlot(data) {
            try {
                const {  } = data
                const reservationID = IDGenerator()
                await sequelize.transaction((t) => { 
                    return Reservation.create({
                        id: reservationID,
                    })
                }).then((result) => {// Transaction STARTED
                    return true
                }).catch((err) => {// Transaction ROOLBACK
                    return false
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
        can_join: DataTypes.STRING,
        reservation_type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};