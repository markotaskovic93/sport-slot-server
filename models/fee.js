const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Fee extends Model {
        
        static async storeFees(data) {
            try {
                const { slot_base_fee, slot_additional_fee } = data
                const generateFeeID = IDGenerator() 
                return Fee.create({
                    id: generateFeeID,
                    slot_base_fee: slot_base_fee,
                    slot_additional_fee: slot_additional_fee
                }).then(result => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Fees are added",
                        body: result 
                    }
                }).catch(err => {
                    return {
                        actionStatus: true,
                        status: 400,
                        message: "Error while creating fee",
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

        static async getSlotFee() {
            try {
                return Fee.findAll({
                    raw: true, 
                    attributes: ['slot_base_fee']
                }).then(result => {
                    return result
                }).catch(err => {
                    return errr
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

    }

    Fee.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        slot_base_fee: DataTypes.STRING,
        slot_additional_fee: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Fee',
    })
    return Fee;
};