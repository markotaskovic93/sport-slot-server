const { Model, Op } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Slot extends Model {
        
        // Ostaje 
        static async storeSlots(data, availableSports, applayedFee) {
            try {
                let res = ''
                for(let i = 0; i < data.slots.length; i++) {
                    let { court_id, slot_date, slot_start_time, slot_end_time, slot_base_price, slot_discount, slot_city, slot_state } = data.slots[i]
                    let calculatedSlotPrice;
                    let slotPriceAfterDiscount;
                    if (slot_discount !== null) {
                        slotPriceAfterDiscount = parseInt(slot_base_price) - ((parseInt(slot_base_price) / 100) * parseInt(slot_discount))
                        calculatedSlotPrice = slotPriceAfterDiscount + ((slotPriceAfterDiscount / 100) * parseInt(applayedFee))
                    } else {
                        calculatedSlotPrice = parseInt(slot_base_price) + ((parseInt(slot_base_price) / 100) * applayedFee)
                    }
                    let slotId = IDGenerator()
                    await sequelize.transaction((t) => { 
                        return Slot.create({
                            id: slotId,
                            court_id: court_id,
                            slot_date: slot_date,
                            slot_start_time: slot_start_time,
                            slot_end_time: slot_end_time,
                            slot_base_price: slot_base_price,
                            slot_price: Math.round(calculatedSlotPrice),
                            slot_discount: slot_discount,
                            slot_discounted_price: slotPriceAfterDiscount,
                            slot_state: slot_state,
                            slot_city: slot_city,
                            slot_available_sports: availableSports,
                            slot_has_reservation: false,
                            slot_booked: false,
                            slot_blocked: false,
                            slot_active: true
                        })
                    }).then((result) => {// Transaction STARTED
                        res = true
                    }).catch((err) => {// Transaction ROOLBACK
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

        // Ostaje
        static async directBookSlot(slot_id) {
            try {
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_booked: true,
                        slot_active: false,
                        slot_has_reservation: false,
                        slot_reservation_id: null
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

        static async groupBookSlot(slot_id, slot_reservation_id) {
            try {
                return sequelize.transaction((t) => { 
                    return Slot.update({
                        slot_booked: false,
                        slot_has_reservation: true,
                        slot_reservation_id: slot_reservation_id,
                        slot_active: true
                    }, {
                        where: {
                            id: slot_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Group reservation created",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating group reservation",
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

        // Ostaje
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
        
        // Ostaje
        static async filterSlots(data) {
            try {
                const { date, time, city, state, offset, sport, bookingType } = data
                let hasReservation
                if (bookingType === 'available') {
                    hasReservation = false
                } else {
                    hasReservation = true
                }
                let queryParams
                if (sport !== '' && bookingType !== '') {
                    queryParams = {
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        },
                        slot_available_sports: { 
                            [Op.contains]: [sport] 
                        },
                        slot_has_reservation: hasReservation,
                        slot_blocked: false,
                        slot_booked: false,
                        slot_active: true
                    }
                } else {
                    queryParams = {
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        },
                        slot_blocked: false,
                        slot_booked: false,
                        slot_active: true
                    }
                }
                return Slot.findAll({
                    where: queryParams,
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

        // Ostaje
        static async getNumberOfSlots(data) {
            try {
                const { date, time, state, city, bookingType, sport } = data
                let hasReservation
                if (bookingType === 'available') {
                    hasReservation = false
                } else {
                    hasReservation = true
                }
                let queryParams
                if (sport !== '' && bookingType !== '') {
                    queryParams = {
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        },
                        slot_available_sports: { 
                            [Op.contains]: [sport] 
                        },
                        slot_has_reservation: hasReservation,
                        slot_blocked: false,
                        slot_booked: false,
                        slot_active: true
                    }
                } else {
                    queryParams = {
                        slot_date: date,
                        slot_start_time: time,
                        slot_city: {
                            [Op.iLike]: `%${city}%`
                        },
                        slot_state: {
                            [Op.iLike]: `%${state}%`
                        },
                        slot_blocked: false,
                        slot_booked: false,
                        slot_active: true
                    }
                }
                return Slot.count({
                    where: queryParams
                }).then((result) => {
                    return result
                }).catch((err) => {
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

        // Ostaje
        static async slotInfo(slotID) {
            try {
                return Slot.findOne({
                    where: {
                        id: slotID,
                        slot_booked: false,
                        slot_blocked: false,
                        slot_active: true
                    },
                    raw: true,
                    attributes: ['slot_has_reservation', 'slot_reservation_id', 'slot_price']
                }).then(result => {
                    return result ? { active: true, result } : { active: false }
                }).catch(err => {
                    return { active: false }
                })
            } catch (error) {
                return {
                    message: "Error while checking slot availability"
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
        slot_base_price: DataTypes.STRING,
        slot_price: DataTypes.STRING,
        slot_discounted_price: DataTypes.STRING,
        slot_discount: DataTypes.STRING,
        slot_state: DataTypes.STRING,
        slot_city: DataTypes.STRING,
        slot_available_sports: DataTypes.ARRAY(DataTypes.STRING),
        slot_has_reservation: DataTypes.BOOLEAN,
        slot_reservation_id: DataTypes.STRING,
        slot_booked: DataTypes.BOOLEAN,
        slot_blocked: DataTypes.BOOLEAN,
        slot_active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Slot',
    });
    return Slot;
};