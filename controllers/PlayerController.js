const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const Player = require('../models/').Player
const IDGenerator = require('../helpers/IDGenerator.js')
const jwt = require('jsonwebtoken')

const loginPlayer = async (req, res) => {
    let player = await Player.findOne({
        where: {
            email: req.body.username
        }
    })
    if(player) {
        let verifiedPassword = bcrypt.compareSync(req.body.password, player.password.trim()) // trim remove all white spaces from both sides of password
        if(verifiedPassword){
            jwt.sign({
                player
            }, 'secretkey', (error, token) => {
                return res.status(200).json({player, token})
            })
        } else {
            return res.status(400).json({
                message: "Password is not correct"
            })
        }
    } else {
        return res.status(400).json({
            message: "Can't find accout with this credentials"
        })
    }
}

const getAllPlayers = async (req, res) => {
    try {
        return await Player.findAll()
        .then((response) => {
            return res.status(200).json(response)
        }).catch((error) => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getPlayer = async (req, res) => {
    try {
        return await Player.findByPk(req.params.id)
        .then((player) => {
            return res.status(200).json(player)
        }).catch((error) => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getPlayersByState = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                state: req.params.state
            }
        }).then(player => {
            return res.status(200).json(player)
        }).catch(error => {
            return res.status(400).json(error)
        }) 
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getBlockedPlayers = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                blocked: true
            }
        }).then(players => {
            return res.status(200).json(players)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getBlockedPlayersByState = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                state: req.params.state,
                blocked: true
            }   
        }).then(players => {
            return res.status(200).json(players)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getVerifiedPlayers = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                verified: true   
            }
        }).then(players => {
            return res.status(200).json(players)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getUnverifiedPlayers = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                verified: false
            }
        }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getVerifiedPlayersByState = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                state: req.params.state,
                verified: true
            }
        }).then(players => {
            return res.status(200).json(players)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
}

const getUnverifiedPlayersByState = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                state: req.params.state,
                verified: false
            }
        }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(400).json(error)
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}


const createPlayer = async (req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let generatedID = IDGenerator()
        return await Player.create({
            id: generatedID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            height: req.body.height,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            phone: req.body.phone,
            password: hashedPassword,
            bio: req.body.bio,
            verified: false,
            blocked: false,
            role: 'player'
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
        
            return res.status(400).json("error 400")
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.body.id)
        if(player) {
            return await Player.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birthday: req.body.birthday,
                height: req.body.height,
                email: req.body.email,
                address: req.body.address,
                state: req.body.state,
                city: req.body.city,
                street: req.body.street,
                phone: req.body.phone,
                bio: req.body.bio,
                age: req.body.age,
                role: 'player'
            }, {
                where: {
                    id: req.body.id
                }
            }).then(player => {
                return res.status(200).json(player)
            })
            .catch(error => {
                return res.status(400).json(error)
            })
        } else {
            return res.status(400).json({
                message: `User with id ${req.body.id} dosn't exist in the collection`
            })
        }  
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const updatePlayerAvatar = async (req, res) => { }

const deletePlayerAccount = async (req, res) => { //TODO: find why return error message and delete row from database
    try {
        return await Player.destroy({
            where: {
                id: req.body.id
            }
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
            return res.status(400).json({
                message: "Player ca't be deleted"
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const verifyPlayerAccount = async (req, res) => {
    try {
        return await Player.update({
            verified: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const blockPlayerAccount = async (req, res) => {
    try {
        return await Player.update({
            blocked: true
        }, {
            where: {
                id: req.params.id
            }
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const unblockPlayerAccount = async (req, res) => {
    try {
        return await Player.update({
            blocked: false
        }, {
            where: {
                id: req.params.id
            }
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const resetPlayerPassword = async (req, res) => {
    try {
        let player = await Player.findOne({
            where: {
                email: req.body.username
            }
        })
        if(player) {
            let hashedPassword = bcrypt.hashSync(req.body.password, 10)
            return await Player.update({
                password: hashedPassword
            }, {
                where: {
                    email: req.body.username
                }
            }).then(update => {
                return res.status(200).json({
                    actionStatus: 'Success',
                    update
                })
            }).catch(error => {
                return res.status(400).json({
                    actionStatus: 'Error',
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: "Player with this email doesn't exist in collection"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const removePlayerResources = async (req, res) => {
    //TODO: call this method when deletePlayer method is triggered to remove resources for that player from server
}

module.exports = {
    loginPlayer,
    getAllPlayers,
    getPlayer,
    getPlayersByState,
    getBlockedPlayers,
    getBlockedPlayersByState,
    getVerifiedPlayers,
    getUnverifiedPlayers,
    getVerifiedPlayersByState,
    getUnverifiedPlayersByState,
    createPlayer,
    updatePlayer,
    updatePlayerAvatar,
    deletePlayerAccount,
    verifyPlayerAccount,
    blockPlayerAccount,
    unblockPlayerAccount,
    resetPlayerPassword
}