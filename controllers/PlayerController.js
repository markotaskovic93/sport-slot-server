const Player = require('../models/').Player

module.exports = {
    getAllPlayers(req, res) {
        return Player.findAll()
        .then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(400).send(error)
        })
    },
    getPlayer(req, res) {
        return Player.find({
            where: {
                id: req.params.id
            }
        }).than((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(400).send(error)
        })
    }
}