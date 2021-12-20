const Court = require('../models/').Court
const IDGenerator = require('../helpers/IDGenerator.js')


const createCourt = async (req, res) => {
    try {
        let courtID = IDGenerator()
        return await Court.create({
            id: courtID,
            court_owner_id: req.body.court_owner_id,
            name: req.body.name,
            address: req.body.address,
            court_enviroment: req.body.court_enviroment,
            court_size: req.body.court_size,
            available_sports: req.body.available_sports,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            facilities: req.body.facilities,
            court_payment_type: req.body.payment_type,
            verified: false,
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



module.exports = {
    createCourt,
    updateCourt,
    getCourtsByCourtOwner,
    getCourt,
    blockCourt,
    unblockCourt
}