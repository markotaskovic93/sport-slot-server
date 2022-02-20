const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')
const { reservation_status_types } = require('../types/slot-reservation/reservation_types.js')

module.exports = (sequelize, DataTypes) => {
    class Slot_reservation extends Model {
        
        static async storeSlotsReservation(data) {
            try {
                const { slot_id, admin_player_id, players_needed, payment_type } = data
                const generatedPassword = IDGenerator()
                return sequelize.transaction((t) => { 
                    return Slot_reservation.create({
                        id: generatedPassword,
                        slot_id: slot_id,
                        admin_player_id: admin_player_id,
                        players_needed: players_needed,
                        players_accepted: 1,
                        reservation_status: reservation_status_types.open,
                        payment_type: payment_type
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot reservation is created",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating slot reservation",
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

        static async updateReservation(data) {
            try {
                const { slot_reservation_id, player_id, reservation_status, payment_type, players_needed } = data
                return sequelize.transaction((t) => { 
                    return Slot_reservation.update({
                        reservation_status: reservation_status,
                        payment_type: payment_type,
                        players_needed: players_needed
                    }, {
                        where: {
                            id: slot_reservation_id,
                            admin_player_id: player_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Reservation is updated!",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while updating reservation",
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

        static async updatePlayersAccepted(data) {
            try {
                const { slot_reservation_id, players_accepted } = data
                return sequelize.transaction((t) => { 
                    return Slot_reservation.update({
                        players_accepted: players_accepted,
                    }, {
                        where: {
                            id: slot_reservation_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Updated player accepted field",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while updating player accepted field",
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

        static async getReservation(data) {
            try {
                const { slot_reservation_id, player_id } = data
                return Slot_reservation.findOne({
                    where: {
                        id: slot_reservation_id,
                        admin_player_id: player_id
                    }
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Reservation",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding reservation",
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

        static async getReservations(data) {
            try {
                const { slot_reservation_id, player_id } = data
                return Slot_reservation.findAll({
                    where: {
                        id: slot_reservation_id,
                        admin_player_id: player_id
                    }
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Reservations",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding reservations",
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

        static async replaceAdminPlayer(data) {
            try {
                const { slot_reservation_id, player_id } = data
                return sequelize.transaction((t) => { 
                    return Slot_reservation.update({
                        admin_player_id: player_id,
                    }, {
                        where: {
                            id: slot_reservation_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Replaced admin player",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while replacing admin player",
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
                const { slot_reservation_id, player_id } = data
                return sequelize.transaction((t) => { 
                    return Slot_reservation.destroy({
                        where: {
                            id: slot_reservation_id,
                            admin_player_id: player_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "removed slot reservation",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while removing slot reservation",
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
        payment_type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Slot_reservation',
    });
    return Slot_reservation;
};