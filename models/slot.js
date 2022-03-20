const { Model, Op } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Slot extends Model {
        
        static async storeSlots(data) {
            try {
                let res = ''
                for(let i = 0; i < data.slots.length; i++) {
                    let { court_id, slot_date, slot_start_time, slot_end_time, slot_price, slot_discount, slot_city, slot_state } = data.slots[i]
                    let slotId = IDGenerator()
                    console.log(data.slots[i])
                    await sequelize.transaction((t) => { 
                        return Slot.create({
                            id: slotId,
                            court_id: court_id,
                            slot_date: slot_date,
                            slot_start_time: slot_start_time,
                            slot_end_time: slot_end_time,
                            slot_price: slot_price,
                            slot_discount: slot_discount,
                            slot_state: slot_state,
                            slot_city: slot_city,
                            slot_has_reservation: true,
                            slot_reservation_id: '123123',
                            slot_booked: false,
                            slot_blocked: false
                        })
                    }).then((result) => {// Transaction STARTED
                        console.log(result)
                        res = true
                    }).catch((err) => {// Transaction ROOLBACK
                        console.log(err)
                        res = false
                    })
                }
                return res
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async removeSlotByCourt(data) {
            try {
                const { slot_id, court_id } = data
                return sequelize.transaction((t) => { 
                    return Slot.destroy({
                        where: {
                            id: slot_id,
                            court_id: court_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot is removed",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while removing slot",
                        body: err.errors 
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
            
        }

        static async blockSlotByCourt(data) {
            try {
                const { slot_id, court_id } = data
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_blocked: true
                    },{
                        where: {
                            id: slot_id,
                            court_id: court_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot is blocked",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while blocking slot",
                        body: err.errors 
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async unblockSlotByCourt(data) {
            try {
                const { slot_id, court_id } = data
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_blocked: false
                    },{
                        where: {
                            id: slot_id,
                            court_id: court_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot is unblocked",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while unblocking slot",
                        body: err.errors 
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async getSlotById(data) {
            try {
                const { slot_id } = data
                return Slot.findOne({
                    where: {
                        id: slot_id
                    }
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding slot slot",
                        body: err.errors 
                    }
                })  
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async getSlotsByCourt(data) {
            try {
                const { court_id } = data
                return Slot.findAll({
                    where: {
                        court_id: court_id
                    }
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slots",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding slot slots",
                        body: err.errors 
                    }
                })  
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async setSlotBooked(slot_id) {
            try {
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_booked: true
                    }, {
                        where: {
                            id: slot_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot is booked",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while booking slot",
                        body: err.errors 
                    }
                }) 
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async unbookSlot(slot_id) {
            try {
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_booked: false
                    }, {
                        where: {
                            id: slot_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slot is booked",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while booking slot",
                        body: err.errors 
                    }
                }) 
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }
        
        static async filterSlots(data) {
            try {
                const { date, time, city, state, offset } = data
                return Slot.findAll({
                    where: {
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        },
                        slot_blocked: false,
                        slot_booked: false
                    },
                    raw: true,
                    attributes: ['id', 'court_id', 'slot_has_reservation', 'slot_price', 'slot_reservation_id', 'slot_start_time', 'slot_end_time', 'slot_date'],
                    offset: offset,
                    limit: 8
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Slots",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while booking slot",
                        body: err.errors 
                    }
                }) 
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async getNumberOfSlots(data) {
            try {
                const { date, time, state, city } = data
                return Slot.count({
                    where: { 
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        }
                    }
                }).then((result) => {
                    return result
                })
                .catch((err) => {
                    return false
                }) 
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

    };
    Slot.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        court_id: DataTypes.BIGINT,
        slot_date: DataTypes.STRING,
        slot_start_time: DataTypes.STRING,
        slot_end_time: DataTypes.STRING,
        slot_price: DataTypes.STRING,
        slot_discount: DataTypes.STRING,
        slot_state: DataTypes.STRING,
        slot_city: DataTypes.STRING,
        slot_has_reservation: DataTypes.BOOLEAN,
        slot_reservation_id: DataTypes.STRING,
        slot_booked: DataTypes.BOOLEAN,
        slot_blocked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Slot',
    });
    return Slot;
};