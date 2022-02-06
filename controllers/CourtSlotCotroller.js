const Court_slots = require('../models/').Court_slots
const IDGenerator = require('../helpers/IDGenerator.js')


const createCourtSlot = async (req, res) => {
    try {
        let response = {}
        for(let i = 0; i < req.body.slots.length; i++) {
            const { court_id, court_slot_date, court_slot_start_time, court_slot_end_time, court_slot_price, court_slot_discount, booked, blocked } = req.body.slots[i]
            let courtSlotID = IDGenerator()
            await Court_slots.create({
                id: courtSlotID,
                court_id: court_id,
                court_slot_date: court_slot_date,
                court_slot_start_time: court_slot_start_time,
                court_slot_end_time: court_slot_end_time,
                court_slot_price: court_slot_price,
                court_slot_discount: court_slot_discount,
                booked: booked,
                blocked: blocked,
            }).then(court => {
                response = {
                    message: 'Slots added',
                }
            }).catch(error => {
                response = {
                    message: 'Slots not added',
                }
            })
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const getCourtSlots = async (req, res) => {
    try {
        return await Court_slots.findAll({
            where: {
                court_id: req.params.id
            }
        })
        .then(courtSlots => {
            return res.status(200).json(courtSlots)
        })
        .catch(error => {
            return res.status(400).json({
                actionMessage: 'Error',
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        }) 
    }
}

const checkIfCourtSlotExist = async (slotID) => {
    try {
        let exist = false
        const courtExist = await Court_slots.findByPk(slotID)
        if(courtExist) {
            exist = true            
        } else {
            exist = false
        }
        return exist
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

const bookCourtSlot = async (slotID) => {
    try {
        const courtSlot = await Court_slots.findByPk(slotID)
        if(courtSlot) {
            return Court_slots.update({
                booked: true
            }, {
                where: {
                    id: slotID
                }
            })
            .then(response => {
                return res.status(200).json({
                    actionMessage: 'Success',
                    response
                })
            })
            .catch(error => {
                res.status(400).json({
                    actionMessage: 'Error',
                    error
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Server error`
        })
    }
}

const unbookCourtSlot = async (slotID) => {
    try {
        const courtSlot = await Court_slots.findByPk(slotID)
        if(courtSlot) {
            return Court_slots.update({
                booked: false
            }, {
                where: {
                    id: slotID
                }
            })
            .then(response => {
                return res.status(200).json({
                    actionMessage: 'Success',
                    response
                })
            })
            .catch(error => {
                res.status(400).json({
                    actionMessage: 'Error',
                    error
                })
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

const checkIfCourtSlotIsBooked = async (slotID) => {
    try {
        const courtSlot = await Court_slots.findAll({
            where: {
                id: slotID
            },
            raw: true,
            attributes: ['booked'], 
        })
        return courtSlot[0].booked
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            error
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

const checkIfSlotIsAvailable = async (slotData) => {
    try {
        const { date, start_time, court_id } = slotData
        return await Court_slots.findOne({
            where: {
                court_id: court_id,
                court_slot_date: date,
                court_slot_start_time: start_time,
                booked: false,
                blocked: false
            },
            raw: true,
            attributes: ['id', 'court_slot_date', 'court_slot_start_time', 'court_slot_end_time', 'court_slot_price', 'court_slot_discount']
        })
        .then((resp) => {
            return resp
        })
        .catch(() => {
            return false
        })
    } catch (error) {
        return false
    }
}

module.exports = {
    createCourtSlot,
    getCourtSlots,
    updateCourtSlot,
    blockCourtSlot,
    unblockCourtSlot,
    deleteCourtSlots,
    deleteCourtSlot,
    bookCourtSlot,
    unbookCourtSlot,
    checkIfCourtSlotIsBooked,
    checkIfSlotIsAvailable,
    checkIfCourtSlotExist
}