const Fee = require('../models/').Fee

class FeeController {

    static async createSlotFee(req, res) {
        try {
            const response = await Fee.storeFees(req.body)
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

    static async updateSlotBaseFee(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateSlotAddiotionalFee(req, res) {
        try {
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
}

module.exports = FeeController