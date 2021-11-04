const bcrypt = require('bcrypt')
const Player = require('../models/').Player
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
        return await Player.find({
            where: {
                id: req.params.id
            }
        }).than((response) => {
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

const getPlayersByLocation = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                location: req.params.location
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

const getBlockedPlayers = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                blocked: true
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

const getBlockedPlayersByLocation = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                location: req.params.location,
                blocked: true
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

const getVerifiedPlayers = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                verified: true   
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

const getVerifiedPlayersByLocation = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                location: req.params.location,
                verified: true
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

const getUnverifiedPlayersByLocation = async (req, res) => {
    try {
        return await Player.findAll({
            where: {
                location: req.params.location,
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
        const salt = bcrypt.genSaltSync(10)
        let hashedPassword = await bcrypt.hashSync(req.body.password, 10)
        let generatedID = Math.floor(Math.random()*9000000000) + 1000000000
        return await Player.create({
            id: generatedID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            height: req.body.height,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            nationality: req.body.nationality,
            street: req.body.street,
            phone: req.body.phone,
            password: hashedPassword,
            bio: req.body.bio,
            verified: false,
            blocked: false,
            age: req.body.age,
            role: 'player'
        }).then(player => {
            return res.status(200).json({player, token})
        })
        .catch(error => {
            return res.status(400).json(error)
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
                city: req.body.city,
                street: req.body.street,
                nationality: req.body.nationality,
                phone: req.body.phone,
                password: hash,
                bio: req.body.bio,
                verified: false,
                blocked: false,
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
        let playerID = parseInt(req.body.id)
        return await Player.destroy({
            where: {
                id: playerID
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
            verified: req.params.verified
        }, {
            where: {
                id: req.params.id
            }
        }).then(player => {
            return res.status(200).json({
                actionStatus: "Success",
                player
            })
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
            return res.status(200).json({
                actionStatus: "Success",
                player
            })
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
            return res.status(200).json({
                actionStatus: "Success",
                player
            })
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

const removePlayerResources = async (req, res) => {
    //TODO: call this method when deletePlayer method is triggered to remove resources for that player from server
}

module.exports = {
    loginPlayer,
    getAllPlayers,
    getPlayer,
    getPlayersByLocation,
    getBlockedPlayers,
    getBlockedPlayersByLocation,
    getVerifiedPlayers,
    getUnverifiedPlayers,
    getVerifiedPlayersByLocation,
    getUnverifiedPlayersByLocation,
    createPlayer,
    updatePlayer,
    updatePlayerAvatar,
    deletePlayerAccount,
    verifyPlayerAccount,
    blockPlayerAccount,
    unblockPlayerAccount
}