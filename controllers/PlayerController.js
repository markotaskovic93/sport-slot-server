const bcrypt = require('bcrypt')
const Player = require('../models/').Player

const getAllPlayers = async (req, res) => {
    try {
        return await Player.findAll()
        .then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch((error) => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        }) 
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
            message: `Server error: ${error}`
        }) 
    }
}


const createPlayer = async (req, res) => {
    try {
        await bcrypt.hash(req.body.password, 10, (err, hash) => {
            return Player.create({
                id: Math.floor(Math.random()*9000000000) + 1000000000,
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
                password: hash,
                bio: req.body.bio,
                verified: false,
                blocked: false,
                age: req.body.age 
            }).then(player => {
                res.status(200).send(player)
            })
            .catch(error => {
                res.status(400).send(error)
            })
        })
    } catch (error) {
        res.status(500).send({
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
                age: req.body.age
            }).then(player => {
                res.status(200).send(player)
            })
            .catch(error => {
                res.status(400).send(error)
            })
        } else {
            res.status(400).send({
                message: `User with id ${req.body.id} dosn't exist in the collection`
            })
        }  
    } catch (error) {
        res.status(500).send({
            message: `Server error: ${error}`
        }) 
    }
}

const updatePlayerAvatar = async (req, res) => { }

const deletePlayerAccount = async (req, res) => {
    try {
        return await Player.destroy({
            where: {
                id: req.body.id
            }
        }).then(player => {
            res.status(200).send(player)
        })
        .catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send({
                actionStatus: "Success",
                player
            })
        })
        .catch(error => {
            res.status(400).send({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send({
                actionStatus: "Success",
                player
            })
        })
        .catch(error => {
            res.status(400).send({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
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
            res.status(200).send({
                actionStatus: "Success",
                player
            })
        })
        .catch(error => {
            res.status(400).send({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        res.status(500).send({
            message: `Server error: ${error}`
        }) 
    }
}

const removePlayerResources = async (req, res) => {
    //TODO: call this method when deletePlayer method is triggered to remove resources for that player from server
}

module.exports = {
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