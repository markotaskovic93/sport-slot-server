const Court = require('../models/').Court

class CourtController {

    // Ostaje
    static async createCourt(req, res) {
        try {
            const response = await Court.storeCourtData(req.body)
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

    // Ostaje
    static async updateCourtData(req, res) {
        try {
            const response = await Court.updateCourtData(req.body)
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

module.exports = CourtController