const { Model } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        
        static async createReservationForSlot(data) {
            try {
                const { player_id, slot_id, sport, reservation_type, players_needed, price_per_person } = data
                const reservationID = IDGenerator()
                return Reservation.create({
                    id: reservationID,
                    slot_id: slot_id,
                    admin_player_id: player_id,
                    sport: sport,
                    players_needed: players_needed,
                    players_accepted: 1,
                    reservation_type: reservation_type,
                    price_per_person: price_per_person,
                    is_active: true
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

        static async getSlotReservation(slotID) {
            try {
                return Reservation.findOne({
                    where: {
                        slot_id: slotID
                    },
                    raw: true,
                    attributes: ['players_needed', 'players_accepted', 'sport', 'reservation_type', 'price_per_person']
                }).then(result => {
                    return result ? result : null
                }).catch(() => {
                    return null
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

        static async getReservationIfActive(reservationID) {
            try {
                return Reservation.findOne({
                    where: {
                        id: reservationID,
                        is_active: true
                    },
                    raw: true,
                    attributes: ['players_needed', 'players_accepted', 'reservation_type', 'price_per_person']
                }).then(result => {
                    return result ? result : null
                }).catch(() => {
                    return null
                })
            } catch (error) {
                return null
            }
        }

        static async updatePlayersAccepted(reservation_id, value) {
            try {
                await sequelize.transaction((t) => {
                    return Reservation.update({
                        players_accepted: value
                    }, {
                        where: {
                            id: reservation_id
                        }
                    })
                }).then(result => {
                    return result === 1 ? true : false
                }).catch(() => {
                    return false
                })  
            } catch (error) {
                return error
            }
        }

        static async removeReservation(reservationID) {
            try {
                await sequelize.transaction((t) => {
                    return Reservation.destroy({
                        where: {
                            id: reservationID
                        }
                    })
                }).then(result => {
                    return result === 1 ? true : false
                }).catch(() => {
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
        sport: DataTypes.STRING,
        reservation_type: DataTypes.STRING,
        price_per_person: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};