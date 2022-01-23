const Court = require('../models/').Court
const IDGenerator = require('../helpers/IDGenerator.js')
const { Op } = require('sequelize')

const {
    checkIfSlotIsAvailable
} = require('./CourtSlotCotroller.js')

const {
    getSlotReservationsBySlot
} = require('./SlotReservationController.js')

const createCourt = async (req, res) => {
    try {
        let courtID = IDGenerator()
        return await Court.create({
            id: courtID,
            court_owner_id: req.body.court_owner_id,
            court_name: req.body.name,
            court_address: req.body.address,
            court_enviroment: req.body.court_enviroment,
            court_size: req.body.court_size,
            court_available_sports: req.body.available_sports,
            court_baners: null,
            court_state: req.body.state,
            court_city: req.body.city,
            court_street: req.body.street,
            court_facilities: req.body.facilities,
            court_payment_type: req.body.payment_type,
            verified: true,
            blocked: false
        }).then(court => {
            return res.status(200).json({
                actionStatus: "Success",
                court
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const updateCourt = async (req, res) => {
    try {
        let court = await Court.findByPk(req.body.id)
        if(court) {
            return await Court.update({
                court_owner_id: req.body.court_owner_id,
                court_name: req.body.name,
                court_address: req.body.address,
                court_enviroment: req.body.court_enviroment,
                court_size: req.body.court_size,
                court_available_sports: req.body.available_sports,
                court_state: req.body.state,
                court_city: req.body.city,
                court_street: req.body.street,
                court_facilities: req.body.facilities,
                court_payment_type: req.body.payment_type,
                verified: req.body.verified,
                blocked: req.body.blocked
            }, {
                where: {
                    id: req.body.id
                }
            }).then(court => {
                return res.status(200).json({
                    actionStatus: "Success",
                    court
                })
            }).catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: `can't find court`
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const getCourt = async (req, res) => {
    try {
        return await Court.find({
            where: {
                id: req.params.court_id,
                court_owner_id: req.params.court_owner_id
            }
        }).then(court => {
            return res.status(200).json({
                actionStatus: "Success",
                court
            })
        }).catch(error => {
            return res.state(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const deleteCourt = async (req, res) => {
    try {
        return await Court.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(court => {
            return res.status(200).json({
                actionStatus: "Success",
                court
            })
        })
        .catch(error => {
            return res.state(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const getCourtsByCourtOwner = async (req, res) => {
    try {
        return await Court.find({
            where: {
                court_owner_id: req.params.court_owner_id
            }
        }).then(courts => {
            return res.status(200).json(courts)
        }).catch(error => {
            return res.status(400).json({
                message: `No courts in database`
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const blockCourt = async (req, res) => {
    try {
        return await Court.update({
            blocked: true
        }, {
            where: {
                id: req.params.court_id
            }
        }).then(court => {
            return res.status(200).json({
                actionStatus: "Success",
                court
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const unblockCourt = async (req, res) => {
    try {
        return await Court.update({
            blocked: false
        }, {
            where: {
                id: req.params.court_id
            }
        }).then(court => {
            return res.status(200).json({
                actionStatus: "Success",
                court
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const searchCourt = async (req, res) => { 
    try {
        const courts = await getCourtFromSearch(req.params)
        let availableCourts = []
        if(courts.length > 0) {
            for(let i = 0; i < courts.length; i++) {
                req.params.court_id = courts[i].id
                let courtSlot = await checkIfSlotIsAvailable(req.params)
                let slotReservations = await getSlotReservationsBySlot(courtSlot.id)
                courts[i].slot = courtSlot
                courts[i].reservations = slotReservations
                if(courtSlot) {
                    availableCourts.push(courts[i])
                }
            }
            return res.status(200).json(availableCourts)
        } else {
            res.status(200).json([])
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            error
        })
    }
}

const getCourtFromSearch = async (courtParams) => {
    try {
        const { sport, location, court_enviroment, payment_type, offset, limit } = courtParams
        const courts = await Court.findAll({
            where: {
                court_available_sports: { 
                    [Op.contains]: [sport]
                },
                court_payment_type: payment_type,
                court_address: location,
                court_enviroment: court_enviroment,
                verified: true,
                blocked: false
            },
            raw: true,
            attributes: ['id', 'court_name', 'court_address', 'court_size', 'court_enviroment'],
            offset: offset, 
            limit: limit
        })
        .then(resp => {
            return resp
        })
        .catch(() => {
            return false
        })
        return courts
    } catch (error) {
        return false
    }
}

module.exports = {
    createCourt,
    updateCourt,
    deleteCourt,
    getCourtsByCourtOwner,
    getCourt,
    blockCourt,
    unblockCourt,
    searchCourt
}