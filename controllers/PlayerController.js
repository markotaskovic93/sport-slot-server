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
        const response = await Player.storePlayerData(req.body)
        if(response.actionStatus) {
            const mailer = new Mailer()
            const email = await mailer.sendEmail()
            if(email.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                // TODO: What will happens here
            }
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async updatePlayerAccount(req, res) {
        const response = await Player.updatePlayerData(req.body)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async getPlayer(req, res) {
        const { id } = req.params
        const response = await Player.getPlayerByID(id)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async deletePlayerAccount(req, res) {
        const { id } = req.params
        const response = await Player.deletePlayer(id)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
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
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async verifyPlayerEmail(req, res) {
        const response = await Player.verifyEmailAccount(req.params)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async blockPlayerAccount(req, res) {
        const response = await Player.blockPlayer(req.params)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async unblockPlayerAccount(req, res) {
        const response = await Player.unblockPlayer(req.params)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

    static async resetPlayerAccountPassword(req, res) {
        const response = await Player.resetPassword(req.body)
        if(response.actionStatus) {
            return res.status(response.status).json(response)
        } else {
            return res.status(response.status).json(response)
        }
    }

}

module.exports = PlayerController