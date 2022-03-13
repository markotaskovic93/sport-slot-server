const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')
const { 
    reservation_status_types, 
    reservation_payment_types 
} = require('../types/slot-reservation/reservation_types.js')

module.exports = (sequelize, DataTypes) => {
    class Slot_reservation extends Model {
        
        static async createReservation(data) {
            try {
                const { 
                    slot_id, admin_player_id, players_needed, players_accepted, 
                    reservation_status, players_can_join, payment_type 
                } = data
                const isSlotReservedByPlayer = await this.isSlotReservedByPlayer(admin_player_id, slot_id)
                if (!isSlotReservedByPlayer) {
                    const generatedID = IDGenerator()
                    return sequelize.transaction((t) => {
                        return Slot_reservation.create({
                            id: generatedID,
                            slot_id: slot_id,
                            admin_player_id: admin_player_id,
                            players_needed: players_needed,
                            players_accepted: players_accepted,
                            reservation_status: reservation_status,
                            players_can_join: players_can_join,
                            payment_type: payment_type
                        })
                    }).then((result) => {// Transaction STARTED
                        return {
                            actionStatus: true,
                            status: 200,
                            message: "Slot reservation is created",
                            body: result 
                        }
                    }).catch((err) => {// Transaction ROOLBACK
                        return {
                            actionStatus: false,
                            status: 403,
                            message: "Error while creating Slot reservation",
                            body: err.errors 
                        }
                    }) 
                } else {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "You already have reservation for this slot",
                        body: null
                    }
                }
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                } 
            }
        }

        static async getMySlotReservations (data) {
            try {
                const { player_id } = data
                return Slot_reservation.findAll({
                    where: {
                        admin_player_id: player_id
                    },
                    raw: true
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result ? "Reservations" : "You don't have reservations",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating Slot reservation",
                        body: err.errors 
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

        static async deleteReservation(data) {
            try {
                const { reservation_id, player_id } = data
                return sequelize.transaction((t) => {
                    return Slot_reservation.destroy({
                        where: {
                            id: reservation_id,
                            admin_player_id: player_id
                        },
                        raw: true
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot reservation is deleted",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while deleting Slot reservation",
                        body: err.errors 
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

        static async isSlotReservedByPlayer(player_id, slot_id) {
            try {
                return Slot_reservation.findOne({
                    where: {
                        slot_id: slot_id,
                        admin_player_id: player_id
                    },
                    raw: true
                }).then((result) => {
                    return result ? true : false
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding slot reservation for player",
                        body: err.errors 
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
    Slot_reservation.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        slot_id: DataTypes.BIGINT,
        admin_player_id: DataTypes.BIGINT,
        players_needed: DataTypes.STRING,
        players_accepted: DataTypes.STRING,
        reservation_status: DataTypes.STRING,
        players_can_join: DataTypes.BOOLEAN,
        payment_type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Slot_reservation',
    });
    return Slot_reservation;
};