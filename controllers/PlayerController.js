const bcrypt = require('bcrypt')
const Player = require('../models/').Player

const getAllPlayers = async (req, res) => {
    return await Player.findAll()
    .then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        res.status(400).send(error)
    })
}

const getPlayer = async (req, res) => {
    return await Player.find({
        where: {
            id: req.params.id
        }
    }).than((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        res.status(400).send(error)
    })
}

const getPlayersByLocation = async (req, res) => {

}

const getPlayersByCourt = async (req, res) => {
    //TODO: This will be implemented when we have court model created
}

const getBlockedPlayers = async (req, res) => {

}

const getBlockedPlayersByLocation = async (req, res) => {

}

const getVerifiedPlayers = async (req, res) => {

}

const getUnverifiedPlayers = async (req, res) => {

}

const getVerifiedPlayersByLocation = async (req, res) => {

}

const getUnverifiedPlayersByLocation = async (req, res) => {

}


const createPlayer = async (req, res) => {
    await bcrypt.hash(req.body.password, 10, (err, hash) => {
        return Player.create({
            id: Math.floor(Math.random()*9000000000) + 1000000000,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            height: req.body.height,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: hash,
            bio: req.body.bio,
            verified: false,
            blocked: false,
            age: req.body.age 
        })
        .then(player => {
            res.status(200).send(player)
        })
        .catch(error => {
            res.status(400).send(error)
        })
    })
}

const updatePlayer = async (req, res) => {
    const player = await Player.findByPk(req.body.id)
    if(player) {
        return await Player.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            //avatar: req.body.avatar,
            height: req.body.height,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: hash,
            bio: req.body.bio,
            verified: false,
            blocked: false,
            age: req.body.age
        })
        .then(player => {
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
}

const updatePlayerAvatar = async (req, res) => {

}

const deletePlayerAccount = async (req, res) => {

}

const verifyPlayerAccount = async (req, res) => {

}

const blockPlayerAccount = async (req, res) => {

}

const removePlayerResources = async (req, res) => {
    //TODO: call this method when deletePlayer method is triggered to remove resources for that player from server
}

module.exports = {
    getAllPlayers,
    getPlayer,
    getPlayersByLocation,
    getPlayersByCourt,
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
    blockPlayerAccount
}