const Player_payment_method = require('../models/').Player_payment_method

class PlayerPaymentController {

    static async createPlayerPaymentMethod(req, res) {
        try {
            const response = await Player_payment_method.createPaymentMethod(req.body)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async updatePlayerPaymentMethod(req, res) {
        try {
            const response = await Player_payment_method.updatePaymentMethod(req.body)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async deletePlayerPaymentMethod(req, res) {
        try {
            const response = await Player_payment_method.deletePaymentMethod(req.params)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async getPaymentMethodDetails(req, res) {
        try {
            const response = await Player_payment_method.getPaymentMethod(req.params)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async getPlayerPaymentMethods(req, res) {
        try {
            const response = await Player_payment_method.getAllPlayerPaymentMethods(req.params)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async blockPlayerPaymentMethod(req, res) {
        try {
            const response = await Player_payment_method.blockPaymentMethod(req.params)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async unblockPlayerPaymentMethod(req, res) {
        try {
            const response = await Player_payment_method.unblockPaymentMethod(req.params)
            if(response.actionStatus) {
                return res.status(response.status).json(response)
            } else {
                return res.status(response.status).json(response)
            }
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

}

module.exports = PlayerPaymentController