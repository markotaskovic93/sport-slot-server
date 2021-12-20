const Court_slots = require('../models/').Court_slots
const IDGenerator = require('../helpers/IDGenerator.js')


const createCourtSlot = async (req, res) => {
    try {
        let response = {}
        for(let i = 0; i < req.body.slots.length; i++) {
            const { courtID, courtSlotDate, courtSlotStartTime, courtSlotEndTime, courtSlotPrice, courtSlotDiscount, blocked } = req.body.slots[i]
            let courtSlotID = IDGenerator()
            await Court_slots.create({
                id: courtSlotID,
                court_id: courtID,
                court_slot_date: courtSlotDate,
                court_slot_start_time: courtSlotStartTime,
                court_slot_end_time: courtSlotEndTime,
                court_slot_price: courtSlotPrice,
                court_slot_discount: courtSlotDiscount,
                blocked: blocked,
            }).then(court => {
                response = {
                    message: 'Slots added',
                }
            }).catch(error => {
                response = {
                    message: 'Slots added',
                }
            })
            console.log('iteration', i)
        }
        return res.status(200).json(response)
        //res.status(200).json(req.body.slots)
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const updateCourtSlot = async (req, res) => {
    try {
        const { slotID, courtID, courtSlotDate, courtSlotStartTime, courtSlotEndTime, courtSlotPrice, courtSlotDiscount } = req.body
        let courtSlot = await Court_slots.findByPk(slotID)
        if(courtSlot) {
            return await Court_slots.update({
                court_id: courtID,
                court_slot_date: courtSlotDate,
                court_slot_start_time: courtSlotStartTime,
                court_slot_end_time: courtSlotEndTime,
                court_slot_price: courtSlotPrice,
                court_slot_discount: courtSlotDiscount
            }, {
                where: {
                    id: slotID
                }
            }).then(slot => {
                return res.status(200).json({
                    actionStatus: "Success",
                    slot
                })
            }).catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: `Court slot doesn't exist in collection`
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const blockCourtSlot = async (req, res) => {
    try {
        const slot = await Court_slots.findByPk(req.params.id) 
        if(slot) {
            return await Court_slots.update({
                blocked: true
            }, {
                where: {
                    id: req.params.id
                }
            }).then(slot => {
                return res.status(200).json({
                    actionStatus: "Success",
                    slot
                })
            }).catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: `Court slot doesn't exist in collection`
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const unblockCourtSlot = async (req, res) => {
    try {
        const slot = await Court_slots.findByPk(req.params.id) 
        if(slot) {
            return await Court_slots.update({
                blocked: false
            }, {
                where: {
                    id: req.params.id
                }
            }).then(slot => {
                return res.status(200).json({
                    actionStatus: "Success",
                    slot
                })
            }).catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: `Court slot doesn't exist in collection`
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const deleteCourtSlots = async (req, res) => {
    try {
        return await Court_slots.destroy({
            where: {},
            truncate: true
        })
        .then((slot) => {
            return res.status(200).json({
                actionStatus: "Court slots deleted",
            })
        })
        .catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}

const deleteCourtSlot = async (req, res) => {
    try {
        const courtSlot = await Court_slots.findByPk(req.body.id)
        if(courtSlot) {
            return await Court_slots.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then((slot) => {
                return res.status(200).json({
                    actionStatus: "Court slot deleted",
                    slot
                })
            })
            .catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        }  
    } catch (error) {
        return res.status(400).json({
            message: `Server error`
        })
    }
}



module.exports = {
    createCourtSlot,
    updateCourtSlot,
    blockCourtSlot,
    unblockCourtSlot,
    deleteCourtSlots,
    deleteCourtSlot
}