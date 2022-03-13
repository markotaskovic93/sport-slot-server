const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const IDGenerator = require('../helpers/IDGenerator.js')

module.exports = (sequelize, DataTypes) => {

    class Court_owner extends Model {
        
        static async login(data) {
            return await Court_owner.findOne({
                where: {
                    email: data
                }
            }).then((result) => { // Transaction STARTED
                return {
                    actionStatus: result !== null ? true : false,
                    status: 200,
                    message: result !== null ? "Court Owner is logged in" : "Court Owner doesn't exist",
                    body: result 
                }
            }).catch((err) => { // Transaction ROOLBACK
                return {
                    actionStatus: false,
                    status: 403,
                    message: "Error while finding Court Owner",
                    body: err.errors 
                }
            })
        }

        static async storeCourtOwnerData(data) {
            console.log(data)
            try {
                const { first_name, last_name, email, state, city, phone, personal_id, password, terms_conditions } = data
                let hashedPassword = bcrypt.hashSync(password, 8)
                let generatedID = IDGenerator()
                return sequelize.transaction((t) => {
                    return Court_owner.create({
                        id: generatedID,
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        state: state,
                        city: city,
                        phone: phone,
                        personal_id: personal_id,
                        password: hashedPassword,
                        email_verified: false,
                        phone_verified: false,
                        identity_verified: false,
                        terms_conditions: terms_conditions,
                        blocked: false,
                    })
                }).then(result => {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Court owner is created",
                        body: result 
                    }
                }).catch(error => {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while creating court owner",
                        body: error.errors 
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

        static async updateCourtOwnerData(data) {
            try {
                const { first_name, last_name, phone, personal_id, state, city, id } = data
                const courtOwner = await Court_owner.getCourtOwnerById(id)
                if(courtOwner.body) {
                    return sequelize.transaction((t) => { 
                        return Court_owner.update({
                            first_name: first_name,
                            last_name: last_name,
                            state: state,
                            city: city,
                            phone: phone,
                            personal_id: personal_id,
                        }, {
                            where: {
                                id: id
                            }
                        })
                    }).then(result => {
                        return {
                            actionStatus: true,
                            status: 200,
                            message: "Court owner is updated",
                            body: result 
                        }
                    }).catch(error => {
                        return {
                            actionStatus: false,
                            status: 403,
                            message: "Can't update court owner",
                            body: error.errors 
                        }
                    })
                } else {
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Court owner profile doesn't exists",
                        body: error.errors
                    }
                }
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                }
            }
        }

        static async getCourtOwnerById(id) {
            try {
                return await Court_owner.findByPk(id, {raw: true})
                    .then(result => {
                        return {
                            actionStatus: true,
                            status: 200,
                            message: "Court owner is finded",
                            body: result 
                        }
                    }).catch(error => {
                        return {
                            actionStatus: false,
                            status: 403,
                            message: "Can't find court owner",
                            body: error.errors 
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

        static deleteCourtOwner(data) {
            try {
                const { id } = data
                return sequelize.transaction((t) => { 
                    return Court_owner.destroy({
                        where: {
                            id: id
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: result === 1 ? true : false,
                        status: 200,
                        message: result === 1 ? "Court owner is deleted" : "Court owner doesn't exists",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while deleting court owner",
                        body: err 
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

    Court_owner.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        personal_id: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        email_verified: DataTypes.BOOLEAN,
        phone_verified: DataTypes.BOOLEAN,
        identity_verified: DataTypes.BOOLEAN,
        terms_conditions: DataTypes.BOOLEAN,
        blocked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Court_owner',
    });
    return Court_owner;
};