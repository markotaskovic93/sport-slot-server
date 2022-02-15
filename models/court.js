const { Model } = require('sequelize');
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {
    class Court extends Model {
        
        static async storeCourtData(data) {
            try {
                const { 
                    court_owner_id, court_name, court_description, 
                    court_enviroment, court_size, court_available_sports, 
                    court_state, court_city, court_street, court_facilities  
                } = data
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

        static async getCourtById(data) {
            try {
                const { court_id } = data
                return Court.findOne({
                    where: {
                        id: court_id
                    },
                    raw: true
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

        static async getCourtByCountOwner(data) {
            try {
                const { court_owner_id } = data
                return Court.findAll({
                    where: {
                        court_owner_id: court_owner_id
                    },
                    raw: true
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Courts",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to find courts",
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

        static async deleteCourtByCourtOwner(data) {
            try {
                const { court_owner_id, court_id } = data
                return sequelize.transaction((t) => { 
                    return Court.destroy({
                        where: {
                            id: court_id,
                            court_owner_id: court_owner_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court deleted",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to delete court",
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

        static async blockCourtByCourtOwner(data) {
            try {
                const { court_id, court_owner_id } = data
                return sequelize.transaction((t) => { 
                    return Court.update({
                        blocked: true
                    }, {
                        where: {
                            court_id: court_id,
                            court_owner_id: court_owner_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court blocked",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to block court",
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

        static async unblockCourtByCourtOwner(data) {
            try {
                const { court_id, court_owner_id } = data
                return sequelize.transaction((t) => { 
                    return Court.update({
                        blocked: false
                    }, {
                        where: {
                            court_id: court_id,
                            court_owner_id: court_owner_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court unblocked",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to unblock court",
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

        static async promoteCourt(data) {
            try {
                const { court_id } = data
                return sequelize.transaction((t) => { 
                    return Court.update({
                        court_promoted: true
                    }, {
                        where: {
                            court_id: court_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Added promotions to court",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to add promotions to court",
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

        static async removeCourtPromotion(data) {
            try {
                const { court_id } = data
                return sequelize.transaction((t) => { 
                    return Court.update({
                        court_promoted: false
                    }, {
                        where: {
                            court_id: court_id
                        }
                    })
                }).then((result) => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Removed court promotion",
                        body: result 
                    }
                }).catch((err) => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while trying to remove court promotion",
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
        court_payment_type: DataTypes.STRING,
        court_promoted: DataTypes.BOOLEAN,
        blocked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Court',
    });
    return Court;
};