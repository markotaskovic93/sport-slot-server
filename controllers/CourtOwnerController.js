const bcrypt = require('bcrypt')
const Court_owner = require('../models/').Court_owner

const jwt = require('jsonwebtoken')


class CourtOwnerController {

    static async loginCourtOwner(req, res) {
        try {
            const { email, password } = req.body
            const courtOwnerExist = await Court_owner.login(email)
            if(courtOwnerExist.actionStatus) {
                let verifiedPassword = bcrypt.compareSync(password, courtOwnerExist.body.password.trim()) // trim remove all white spaces from both sides of password
                if(verifiedPassword){
                    courtOwnerExist.isLogged = true
                    jwt.sign({
                        courtOwnerExist
                    }, 'secretkey', (error, token) => {
                        return res.status(200).json({courtOwnerExist, token})
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
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    } // login

    static async createCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.storeCourtOwnerData(req.body)
            // const mailer = new Mailer()
            // const email = await mailer.sendEmail()
            //if(email.actionStatus) {
            return res.status(response.status).json(response)
            //} else {
                // TODO: What will happens here
            //}
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    } // sign up

    static async updateCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.updateCourtOwnerData(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

    static async getCourtOwnerByID(req, res) {
        try {
            const { id } = req.params
            const response = await Court_owner.getCourtOwnerById(id)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

    static async deleteCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.deleteCourtOwner(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

}

module.exports = CourtOwnerController