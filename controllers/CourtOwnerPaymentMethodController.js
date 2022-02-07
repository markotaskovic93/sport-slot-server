const Court_owner_payment_method = require('../models/').Court_owner_payment_method

class CourtOwnerPaymentMethodController {

    static async createCourtOwnerPaymentMethod(req, res) {
        try {
            const response = await Court_owner_payment_method.createPaymentMethod(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async updateCourtOwnerPaymentMethod(req, res) {
        try {
            const response = await Court_owner_payment_method.updatePaymentMethod(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async getCourtOwnerPaymentMethods(req, res) {
        try {
            const response = await Court_owner_payment_method.getPaymentMethodsByCourtOwner(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async blockCourtOwnerPaymentMethod(req, res) {
        try {
            const response = await Court_owner_payment_method.blockPaymentMethod(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async unblockCourtOwnerPaymentMethod(req, res) {
        try {
            const response = await Court_owner_payment_method.unblockPaymentMethod(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return {
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            }
        }
    }

    static async deleteCourtOwnerPaymentMethod(req, res) {
        try {
            const response = await Court_owner_payment_method.deletePaymentMethod(req.params)
            return res.status(response.status).json(response)
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

module.exports = CourtOwnerPaymentMethodController