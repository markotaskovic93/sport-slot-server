const IDGenerator = require('../helpers/IDGenerator.js')
const bcrypt = require('bcrypt')
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Player extends Model {

        static async login(email) {
            try {
                return Player.findOne({
                    where: {
                        email: email
                    },
                    attributes: ['id', 'full_name', 'email', 'password'],
                    raw: true
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result !== null ? "Player is logged in" : "Player doesn't exist",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while finding player",
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
    
        static async storePlayerData(data) {
            const generatedID = IDGenerator()
            try {
                const { 
                    full_name, birthday, height, email, 
                    state, city, street, gender, age, 
                    phone, password, bio, sport, terms
                } = data
                if (terms) {
                    const hashedPassword = bcrypt.hashSync(password, 10)
                    return sequelize.transaction((t) => {
                        return Player.create({
                            id: generatedID,
                            full_name: full_name,
                            birthday: birthday,
                            height: height,
                            email: email,
                            state: state,
                            city: city,
                            street: street,
                            gender: gender,
                            age: age,
                            phone: phone,
                            not_hashed_password: password,
                            password: hashedPassword,
                            bio: bio,
                            prefered_sport: sport,
                            balance: 0,
                            email_verified: false,
                            phone_verified: false,
                            terms_conditions: terms,
                            blocked: false,
                            notification_invites: true,
                            notification_messages: true,
                            notification_reminders: true,
                            notification_promotions: true
                        })
                    }).then(() => {
                        return {
                            playerID: generatedID,
                            actionStatus: true,
                            status: 200,
                            playerName: full_name
                        }
                    }).catch(() => {
                        return {
                            playerID: generatedID,
                            actionStatus: false,
                            status: 403,
                            playerName: full_name
                        }
                    })
                } else {
                    return {
                        playerID: generatedID,
                        actionStatus: false,
                        status: 400,
                        playerName: full_name,
                        reason: "Terms and conditions are not accepted"
                    }
                }
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }
            } 
        } // store player


        static async updatePlayerData(data) {
            try {
                const { 
                    id, full_name, birthday, height, email, 
                    state, city, street, gender, age, 
                    phone, bio, sport, terms
                } = data
                const player = await Player.getPlayerByID(id)
                if(player.body) {
                    return sequelize.transaction((t) => {
                        return Player.update({
                            full_name: full_name,
                            birthday: birthday,
                            height: height,
                            email: email,
                            state: state,
                            city: city,
                            street: street,
                            gender: gender,
                            age: age,
                            phone: phone,
                            bio: bio,
                            prefered_sport: sport,
                            terms_conditions: terms,
                        }, {
                            where: {
                                id: id
                            }
                        })
                    }).then((result) => {// Transaction STARTED
                        return {
                            actionStatus: true,
                            status: 200,
                            message: "Player is updated",
                            body: result 
                        }
                    }).catch((err) => {// Transaction ROOLBACK
                        return {
                            actionStatus: false,
                            status: 403,
                            message: "Error while creating player",
                            body: err.errors 
                        }
                    })
                } 
                return {
                    actionStatus: false,
                    status: 403,
                    message: "This player doesn't exist in collection",
                    body: [] 
                }
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error",
                    body: error
                } 
            }
        } // update player


        static async getPlayerByID(id) {
            try {
                return Player.findByPk(id, { raw: true })
                    .then((result) => { // Transaction STARTED
                        return {
                            actionStatus: true,
                            status: 200,
                            message: result !== null ? "Player is finded" : "Player doesn't exist",
                            body: result 
                        }
                    }).catch((err) => { // Transaction ROOLBACK
                        return {
                            actionStatus: false,
                            status: 403,
                            message: "Error while finding player",
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

        static async getPlayers() {
            try {
                return Player.findAll().then(result => {
                    return {
                        actionStatus: true,
                        status: 200,
                        result
                    }
                }).catch(() => {
                    return {
                        actionStatus: false,
                        status: 400,
                        message: "Bad request"
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500,
                    message: "Server error"
                } 
            }
        }

        static async getBalance(playerID) {
            try {
                return Player.findOne({
                    where: {
                        id: playerID
                    },
                    raw: true,
                    attributes: ['balance']
                }).then(result => {
                    return result
                }).catch(() => {
                    return false
                })
            } catch (error) {
                return false 
            }
        }

        static async deletePlayer(id) {
            try {
                return sequelize.transaction((t) => {
                    return Player.destroy({
                        where: {
                            id: id
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: result === 1 ? "Player is deleted" : "Player doesn't exists",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while deleting player",
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

        static async deletePlayers() {
            try {
                return sequelize.transaction(t => {
                    return Player.destroy({
                        where: {},
                        truncate: true
                    })
                }).then(result => {
                    console.log('brisanje igraca... ', result)
                    if (result === 0) {
                        return {
                            actionStatus: true,
                            status: 200
                        }
                    } else {
                        return {
                            actionStatus: false,
                            status: 200
                        }
                    }
                }).catch(err => {
                    console.log('error je ovaj... ', err)
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }
            }
        }

        static async searchPlayersWithCityStateAndName(data) {
            try {
                return Player.findAll({
                    where: data,
                    limit: 8,
                    offset: 0,
                    attributes: ['id', 'full_name', 'state', 'city', 'height', 'age'],
                    raw: true
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Searching finished",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Error while deleting player",
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

        static async verifyEmailAccount(data) {
            try {
                const { email } = data
                return sequelize.transaction((t) => { 
                    return Player.update({
                        email_verified: true
                    },{
                        where: {
                            email: email
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Player email is verified",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Player email is not verified",
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

        static async blockPlayer(data) {
            try {
                const { playerId } = data
                return sequelize.transaction((t) => { 
                    return Player.update({
                        blocked: true
                    },{
                        where: {
                            id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Player is blocked",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't block player",
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

        static async unblockPlayer(data) {
            try {
                const { playerId } = data
                return sequelize.transaction((t) => { 
                    return Player.update({
                        blocked: false
                    },{
                        where: {
                            id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Player is unblocked",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Can't unblock player",
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

        static async resetPassword(data) {
            try {
                const { playerId, password } = data
                const hashedPassword = bcrypt.hashSync(password, 10)
                return sequelize.transaction((t) => { 
                    return Player.update({
                        password: hashedPassword
                    }, {
                        where: {
                            id: playerId
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Password is changed",
                        body: result 
                    }
                }).catch((err) => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403,
                        message: "Password is not changed",
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

        static async updateNotification(data) {
            try {
                const { 
                    player_id, notification_invites, notification_messages, 
                    notification_reminders, notification_promotions 
                } = data
                return sequelize.transaction((t) => { 
                    return Player.update({
                        notification_invites: notification_invites,
                        notification_messages: notification_messages,
                        notification_reminders: notification_reminders,
                        notification_promotions: notification_promotions
                    }, {
                        where: {
                            id: player_id
                        }
                    })
                }).then((result) => { // Transaction STARTED
                    return {
                        actionStatus: result[0] === 1 ? true : false,
                        status: 200
                    }
                }).catch(() => { // Transaction ROOLBACK
                    return {
                        actionStatus: false,
                        status: 403
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }
            }
        }

        static async updatePlayerBalance(data) {
            try {
                const { player_id, balance } = data
                return sequelize.transaction((t) => { 
                    return Player.update({
                        balance: balance
                    }, {
                        where: {
                            id: player_id
                        }
                    })
                }).then(() => {
                    return {
                        actionStatus: true,
                        status: 200
                    }
                }).catch(() => {
                    return {
                        actionStatus: false,
                        status: 400
                    }
                })
            } catch (error) {
                return {
                    actionStatus: false,
                    status: 500
                }
            }
        }

        static async getBalance(playerID) {
            try {
                return Player.findOne({
                    where: {
                        id: playerID
                    },
                    raw: true,
                    attributes: ['balance']
                }).then(result => {
                    return result
                }).catch(() => {
                    return 0
                })
            } catch (error) {
                return 0
            }
        }

    } // Model class

    Player.init({
        id: {
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        full_name: DataTypes.STRING,
        birthday: DataTypes.STRING,
        height: DataTypes.STRING,
        email: DataTypes.STRING,
        state: DataTypes.STRING, 
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.STRING,
        phone: DataTypes.STRING,
        not_hashed_password: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.TEXT,
        prefered_sport: DataTypes.STRING,
        balance: DataTypes.INTEGER,
        email_verified: DataTypes.BOOLEAN,
        phone_verified: DataTypes.BOOLEAN,
        terms_conditions: DataTypes.BOOLEAN,
        blocked: DataTypes.BOOLEAN,
        notification_invites: DataTypes.BOOLEAN,
        notification_messages: DataTypes.BOOLEAN,
        notification_reminders: DataTypes.BOOLEAN,
        notification_promotions: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Player',
    });
    return Player;
};