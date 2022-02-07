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