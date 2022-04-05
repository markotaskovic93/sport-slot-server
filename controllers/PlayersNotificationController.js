const PlayerNotification = require('../models/').Players_notification

class PlayersNotificationController { 
    
    static async getPlayerNotificaitons(req, res) {
        try {
            const { player_id } = req.params
            const response = await PlayerNotification.getNotifications(player_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async removePlayerNotification(req, res) {
        try {
            const { notification_id } = req.params
            const response = await PlayerNotification.removeNotifications(notification_id)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = PlayersNotificationController