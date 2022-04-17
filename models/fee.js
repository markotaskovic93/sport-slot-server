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
                }).then(() => {
                    return {
                        actionStatus: true,
                        status: 200
                    }
                }).catch(() => {
                    return {
                        actionStatus: false,
                        status: 400
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }        
            }
        }

        static async getFees() {
            try {
                return Fee.findAll({
                    raw: true, 
                    attributes: ['slot_base_fee']
                }).then(result => {
                    return result
                }).catch(() => {
                    return []
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }    
            }
        }

        static async destroyFees () {
            try {
                return sequelize.transaction((t) => {
                    return Fee.destroy({
                        where: {},
                        truncate: true
                    })
                }).then(result => {
                    return result == 0 ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
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