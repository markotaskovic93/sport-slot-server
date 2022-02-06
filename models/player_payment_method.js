const IDGenerator = require('../helpers/IDGenerator.js')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Player_payment_method extends Model {
        
        static async createPaymentMethod(data) {
            try {
                const { player_id, first_name, last_name, card_number, expiration_month, expiration_year, cvv, zip_code, state } = data
                const generatedID = IDGenerator()
                return sequelize.transaction((t) => { 
                    return Player_payment_method.create({
                        id: generatedID,
                        player_id: player_id,
                        first_name: first_name,
                        last_name: last_name,
                        card_number: card_number,
                        expiration_month: expiration_month,
                        expiration_year: expiration_year,
                        cvv: cvv,
                        zip_code: zip_code,
                        state: state,
                        blocked: false
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Payment method added",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't add payment method",
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

        static async updatePaymentMethod(data) {
            try {
                const { id, player_id, first_name, last_name, card_number, expiration_month, expiration_year, cvv, zip_code, state } = data
                return sequelize.transaction((t) => { 
                    return Player_payment_method.update({
                        first_name: first_name,
                        last_name: last_name,
                        card_number: card_number,
                        expiration_month: expiration_month,
                        expiration_year: expiration_year,
                        cvv: cvv,
                        zip_code: zip_code,
                        state: state
                    }, {
                        where: {
                            id: id,
                            player_id: player_id
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Payment method is updated",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't update payment method",
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

        static async deletePaymentMethod(data) {
            try {
                const { playerId, methodId } = data
                return sequelize.transaction((t) => { 
                    return Player_payment_method.destroy({
                        where: {
                            id: methodId,
                            player_id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result === 1 ? "Payment method is deleted" : "Can't find payment method",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't delete payment method",
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

        static async getPaymentMethod(data) {
            try {
                const { playerId, methodId } = data
                return Player_payment_method.findOne({
                    where: {
                        id: methodId,
                        player_id: playerId
                    }
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result === null ? "Can't find payment method" : "Payment finded",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error rised when try to get payment method details",
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

        static async getAllPlayerPaymentMethods(data) {
            try {
                const { playerId } = data
                return Player_payment_method.findAll({
                    where: {
                        player_id: playerId
                    }
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result.length === 0 ? "Player don't have payment methods" : "Payment methods",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error rised when try to get payment method details",
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

        static async blockPaymentMethod(data) {
            try {
                const { playerId, methodId } = data
                return sequelize.transaction((t) => { 
                    return Player_payment_method.update({
                        blocked: true
                    }, {
                        where: {
                            id: methodId,
                            player_id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Payment method is blocked",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't block payment method",
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


        static async unblockPaymentMethod(data) {
            try {
                const { playerId, methodId } = data
                return sequelize.transaction((t) => { 
                    return Player_payment_method.update({
                        blocked: false
                    }, {
                        where: {
                            id: methodId,
                            player_id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Payment method is unblocked",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't unblock payment method",
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
    Player_payment_method.init({
        id: {
        primaryKey: true,
        type: DataTypes.BIGINT
        },
        player_id: DataTypes.BIGINT,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        card_number: DataTypes.STRING,
        expiration_month: DataTypes.STRING,
        expiration_year: DataTypes.STRING,
        cvv: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        state: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Player_payment_method',
    });
    return Player_payment_method;
};