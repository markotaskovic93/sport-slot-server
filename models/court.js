const { Model } = require('sequelize');
const { Op } = require('sequelize')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Court extends Model {
        
        // Ostaje
        static async storeCourtData(data) {
            try {
                const { 
                    court_owner_id, court_name, court_description, 
                    court_enviroment, court_size, court_available_sports, 
                    court_state, court_city, court_street, court_facilities  
                } = data
                const courtID = IDGenerator()
                return sequelize.transaction((t) => { 
                    return Court.create({
                        id: courtID,
                        court_owner_id: court_owner_id,
                        court_name: court_name,
                        court_description: court_description,
                        court_enviroment: court_enviroment,
                        court_size: court_size,
                        court_available_sports: court_available_sports,
                        court_state: court_state,
                        court_city: court_city,
                        court_street: court_street,
                        court_facilities: court_facilities,
                        court_promoted: false,
                        blocked: false
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court is created",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating court",
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
        static async updateCourtData(data) {
            try {
                const { 
                    court_id, court_name, court_description, 
                    court_enviroment, court_size, court_available_sports, 
                    court_state, court_city, court_street, court_facilities  
                } = data
                return sequelize.transaction((t) => { 
                    return Court.update({
                        court_owner_id: court_owner_id,
                        court_name: court_name,
                        court_description: court_description,
                        court_enviroment: court_enviroment,
                        court_size: court_size,
                        court_available_sports: court_available_sports,
                        court_state: court_state,
                        court_city: court_city,
                        court_street: court_street,
                        court_facilities: court_facilities
                    }, {
                        where: {
                            id: court_id
                        }
                    })
                }).then((result) => {// Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court is updated",
                        body: result 
                    }
                }).catch((err) => {// Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while updating court",
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
        static async courtIsAvailable(courtID) {
            try {
                return Court.findOne({
                    where: {
                        id: courtID,
                        blocked: false
                    },
                    raw: true,
                    attributes: ['court_available_sports']
                }).then(result => {
                    return result ? { status: true, result } : { status: false }
                }).catch(err => {
                    return err
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
        static async getCourtInfo(courtId) {
            try {
                return Court.findOne({
                    where: {
                        id: courtId
                    },
                    raw: true,
                    attributes: ['court_name', 'court_street']
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to find court",
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


    };
    Court.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        court_owner_id: DataTypes.BIGINT,
        court_name: DataTypes.STRING,
        court_description: DataTypes.TEXT,
        court_enviroment: DataTypes.STRING,
        court_size: DataTypes.STRING,
        court_available_sports: DataTypes.ARRAY(DataTypes.STRING),
        court_baners: DataTypes.ARRAY(DataTypes.STRING),
        court_state: DataTypes.STRING,
        court_city: DataTypes.STRING,
        court_street: DataTypes.STRING,
        court_facilities: DataTypes.ARRAY(DataTypes.STRING),
        court_promoted: DataTypes.BOOLEAN,
        blocked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Court',
    });
    return Court;
};