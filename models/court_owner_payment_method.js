const {
    Model
} = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Court_owner_payment_method extends Model {

        static async createPaymentMethod(data) {
            try {
                const { court_owner_id, first_name, last_name, card_number, expiration_month, expiration_year, cvv, zip_code, state } = data
                const generatedID = IDGenerator()
                return sequelize.transaction((t) => { 
                    return Court_owner_payment_method.create({
                        id: generatedID,
                        court_owner_id: court_owner_id,
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
        } // create payment method

        static async updatePaymentMethod(data) {
            try {
                const { id, court_owner_id, first_name, last_name, card_number, expiration_month, expiration_year, cvv, zip_code, state } = data
                return sequelize.transaction((t) => { 
                    return Court_owner_payment_method.update({
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
                            court_owner_id: court_owner_id
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
        } // update payment method


        static async getPaymentMethodsByCourtOwner(data) {
            try {
                const { courtOwnerId } = data
                return Court_owner_payment_method.findAll({
                    where: {
                        court_owner_id: courtOwnerId
                    }
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Payment methods",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't find payment methods",
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
                const { methodId } = data
                return sequelize.transaction((t) => { 
                    return Court_owner_payment_method.update({
                            blocked: true
                        },{
                        where: {
                            id: methodId
                        },
                        raw: true
                    })
                }).then((result) => { // Transaction STARTED
                    console.log(result)
                    return {
                        actionStatus: result[0] === 1 ? true : false,
                        status: 200,
                        message: result[0] === 1 ? "Payment methods is blocked" : "Can't block this payment",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't block payment methods",
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
                const { methodId } = data
                return sequelize.transaction((t) => { 
                    return Court_owner_payment_method.update(
                        {
                            blocked: false
                        },{
                        where: {
                            id: methodId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: result[0] === 1 ? true : false,
                        status: 200,
                        message: result[0] === 1 ? "Payment methods is unblocked" : "Can't unblock this payment",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't unblock payment methods",
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
                const { methodId } = data
                return sequelize.transaction((t) => { 
                    return Court_owner_payment_method.destroy({
                        where: {
                            id: methodId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    console.log(result)
                    return {
                        actionStatus: result === 1 ? true : false,
                        status: 200,
                        message: result === 1 ? "Payment methods is deleted" : "Can't delete this payment",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't delete payment methods",
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
    Court_owner_payment_method.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        court_owner_id: DataTypes.BIGINT,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        card_number: DataTypes.STRING,
        expiration_month: DataTypes.STRING,
        expiration_year: DataTypes.STRING,
        cvv: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        state: DataTypes.STRING,
        blocked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Court_owner_payment_method',
    });
    return Court_owner_payment_method;
};