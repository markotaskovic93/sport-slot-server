const sequelize = require('sequelize')
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
    },
    createPlayer(req, res) {
        return sequelize.Transaction((t) => {
            return Player.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birthday: req.body.birthday,
                height: req.body.height,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                password: req.body.password,
                bio: req.body.bio,
                verified: req.body.verified,
                blocked: req.body.blocked
            }, { Transaction: t })
            .then(player => {
                res.status(200).send(player)
            })
            .catch(error => {
                res.status(400).send(error)
            })
        })
    }
}