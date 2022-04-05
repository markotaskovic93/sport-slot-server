const { Model } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Players_notification extends Model {

        static async createNotification(data) {
            try {
                const { playerID, slotID, reservationID, notificationType, notificationDesc } = data
                const generatedID = IDGenerator()
                await sequelize.transaction((t) => {
                    return Players_notification.create({
                        id: generatedID,
                        slot_id: slotID,
                        reservation_id: reservationID,
                        player_id: playerID,
                        notification_type: notificationType,
                        notification_desc: notificationDesc
                    })
                }).then(result => {
                    return result ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return false
            }
        }
        
        static async getNotifications(playerID) {
            try {
                return Players_notification.findAll({
                    where: {
                        player_id: playerID
                    },
                    raw: true
                }).then(result => {
                    return result
                }).catch(err => {
                    return err
                })
            } catch (error) {
                return error
            }
        }

        static async removeNotifications(notificationID) {
            try {
                await sequelize.transaction((t) => {
                    return Players_notification.destroy({
                        where: {
                            id: notificationID
                        }
                    })
                }).then(result => {
                    return result == 1 ? true : false
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return error
            }
        }

    };
    Players_notification.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        slot_id: DataTypes.BIGINT,
        reservation_id: DataTypes.BIGINT,
        player_id: DataTypes.BIGINT,
        notification_type: DataTypes.STRING,
        notification_desc: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Players_notification',
    });
    return Players_notification;
}