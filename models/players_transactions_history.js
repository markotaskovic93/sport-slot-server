const { Model } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Players_transactions_history extends Model {
        
        static async createTransaction(data) {
            try {
                const { player_id, transaction_type, transaction_desc, transaction_amount } = data
                const transactionID = IDGenerator()
                //await sequelize.transaction((t) => {
                    return Players_transactions_history.create({
                        id: transactionID,
                        player_id: player_id,
                        transaction_type: transaction_type,
                        transaction_desc: transaction_desc,
                        transaction_amount: transaction_amount
                    }, {
                        raw: true
                    }).then(result => {
                        return result ? true : false
                    }).catch(() => {
                        return false
                    })
                //})
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
    Players_transactions_history.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        player_id: DataTypes.BIGINT,
        transaction_type: DataTypes.STRING,
        transaction_desc: DataTypes.STRING,
        transaction_time: DataTypes.STRING,
        transaction_amount: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Players_transactions_history',
    });
    return Players_transactions_history;
};