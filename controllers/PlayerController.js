const bcrypt = require('bcrypt')
const Player = require('../models/').Player
const Mailer = require('../services/mailer/Mailer.js')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')


class PlayerController {

    static async loginPlayer(req, res) {
        const { email, password } = req.body
        const response = await Player.login(email)
        if(response.body) {
            let verifiedPassword = bcrypt.compareSync(password, response.body.password.trim()) // trim remove all white spaces from both sides of password
            if(verifiedPassword){
                jwt.sign({
                    response
                }, 'secretkey', (error, token) => {
                    return res.status(200).json({response, token})
                })
            } else {
                return res.status(400).json({
                    message: "Password is not correct"
                })
            }
        } else {
            return res.status(400).json({
                message: "Can't find accout with this credentials"
            })
        }
    }

    static async createPlayerAccount(req, res) {
        try {
            const { email } = req.body
            const response = await Player.storePlayerData(req.body)
            if (response.actionStatus) {
                const mailStatus = Mailer.sendEmail(email)
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return res.status(400).json({
                message: "Server error",
                code: 100
            })
        }
    }

    static async resendVerficationEmial(req, res) {
        try {
            const { email } = req.params
            const mailStatus = Mailer.sendEmail(email)
        } catch (error) {
            return res.status(400).json({
                message: "Server error",
                code: 100
            })
        }
    }

    static async updatePlayerAccount(req, res) {
        const response = await Player.updatePlayerData(req.body)
        return res.status(response.status).json(response)
    }

    static async getPlayer(req, res) {
        const { id } = req.params
        const response = await Player.getPlayerByID(id)
        return res.status(response.status).json(response)
    }

    static async deletePlayerAccount(req, res) {
        const { id } = req.params
        const response = await Player.deletePlayer(id)
        return res.status(response.status).json(response)
    }

    static async findPlayersByStateCityName(req, res) {
        const { city, state, full_name } = req.params
        let searchCondition = {}
        if(!full_name) {
            searchCondition = {
                city: {
                    [Op.iLike]: `%${city}%`
                },
                state: {
                    [Op.iLike]: `%${state}%`
                }
            }
        } else {
            searchCondition = {
                city: {
                    [Op.iLike]: `%${city}%`
                },
                state: {
                    [Op.iLike]: `%${state}%`
                },
                full_name: {
                    [Op.iLike]: `%${full_name}%`
                }
            }
        }
        const response = await Player.searchPlayersWithCityStateAndName(searchCondition)
        return res.status(response.status).json(response)
    }

    static async verifyPlayerEmail(req, res) {
        try {
            const response = await Player.verifyEmailAccount(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                message: "Server error",
                code: 100
            })
        }
    }

    static async blockPlayerAccount(req, res) {
        const response = await Player.blockPlayer(req.params)
        return res.status(response.status).json(response)
    }

    static async unblockPlayerAccount(req, res) {
        const response = await Player.unblockPlayer(req.params)
        return res.status(response.status).json(response)
    }

    static async resetPlayerAccountPassword(req, res) {
        const response = await Player.resetPassword(req.body)
        return res.status(response.status).json(response)
    }

    static async updateNotificationSettings(req, res) {
        const response = await Player.updateNotification(req.body)
        return res.status(response.status).json(response)
    }

    static async updateBalance(req, res) {
        try {
            const response = await Player.updatePlayerBalance(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getAllPlayers(req, res) {
        try {
            const response = await Player.getPlayers()
            return res.status(response.status).json(response.result)
        } catch (error) {
            return res.status(400).json({
                message: "Server error",
                code: 100
            })
        }
    }

}

module.exports = PlayerController