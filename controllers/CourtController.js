const Court = require('../models/').Court

// const {
//     checkIfSlotIsAvailable
// } = require('./CourtSlotCotroller.js')

// const {
//     getSlotReservationsBySlot
// } = require('./SlotReservationController.js')

class CourtController {

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

    static async getCourt(req, res) {
        try {
            const response = await Court.getCourtById(req.params)
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

    static async getCourts(req, res) {
        try {
            const response = await Court.getCourtByCountOwner(req.params)
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

    static async deleteCourt(req, res) {
        try {
            const response = await Court.deleteCourtByCourtOwner(req.params)
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


    static async blockCourt(req, res) {
        try {
            const response = await Court.blockCourtByCourtOwner(req.body)
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

    static async unblockCourt(req, res) {
        try {
            const response = await Court.unblockCourtByCourtOwner(req.body)
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

    static async promoteCourt(req, res) {
        try {
            const response = await Court.promoteCourt(req.body)
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

    static async removePromotion(req, res) {
        try {
            const response = await Court.removeCourtPromotion(req.body)
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