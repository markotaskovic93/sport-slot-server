const bcrypt = require('bcrypt')
const Court_owner = require('../models/').Court_owner
const IDGenerator = require('../helpers/IDGenerator.js')
const jwt = require('jsonwebtoken')


const loginCourtOwner = async (req, res) => {
    let courtOwner = await Court_owner.findOne({
        where: {
            email: req.body.username
        }
    })
    if(courtOwner) {
        let verifiedPassword = bcrypt.compareSync(req.body.password, courtOwner.password.trim()) // trim remove all white spaces from both sides of password
        if(verifiedPassword){
            jwt.sign({
                courtOwner
            }, 'secretkey', (error, token) => {
                return res.status(200).json({courtOwner, token})
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

const createCourtOwnerAccount = async (req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
        let generatedID = IDGenerator()
        return await Court_owner.create({
            id: generatedID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            phone: req.body.phone,
            personal_id: req.body.personal_id,
            password: hashedPassword,
            verified: false,
            blocked: false,
            role: 'court_owner'
        }).then(courtOwner => {
            return res.status(200).json({
                actionStatus: "Success",
                courtOwner
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

const updateCourtOwnerAccount = async (req, res) => {
    try {
        const courtOwner = await Court_owner.findByPk(req.body.id)
        if(courtOwner) {
            return await Player.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birthday: req.body.birthday,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                personal_id: req.body.personal_id,
                password: hash,
                verified: req.body.verified,
                blocked: req.body.blocked,
                role: 'court_owner'
            }, {
                where: {
                    id: req.body.id
                }
            }).then(courtOwner => {
                return res.status(200).json({
                    actionStatus: "Success",
                    courtOwner
                })
            })
            .catch(error => {
                return res.status(400).json({
                    actionStatus: "Error",
                    error
                })
            })
        } else {
            return res.status(400).json({
                message: `Court owner with id ${req.body.id} dosn't exist in the collection`
            })
        }  
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        }) 
    }
}

const deleteCourtOwnerAccount = async (req, res) => {
    try {
        let courtOwnerID = parseInt(req.body.id)
        return await Court_owner.destroy({
            where: {
                id: courtOwnerID
            }
        }).than((courtOwner) => {
            return res.status(200).json({
                actionStatus: "Success",
                courtOwner
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

const verifyCourtOwnerAccount = async (req, res) => {
    try {   
        return await Court_owner.update({
            verify: true
        }, {
            where: {
                id: req.params.id
            }
        }).than(courtOwner => {
            return res.status(200).json({
                actionStatus: "Success",
                courtOwner
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Sever error`
        })
    }   
}

const blockCourtOwnerAccount = async (req, res) => {
    try {
        return await Court_owner.update({
            blocked: true
        }, {
            where: {
                id: req.params.id
            }
        }).than(courtOwner => {
            return res.status(200).json({
                actionStatus: "Success",
                courtOwner
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Sever error`
        })
    }
}

const unblockCourtOwnerAccount = async (req, res) => {
    try {
        return await Court_owner.update({
            blocked: false
        }, {
            where: {
                id: req.body.id
            }
        }).than(courtOwner => {
            return res.status(200).json({
                actionStatus: "Success",
                courtOwner
            })
        }).catch(error => {
            return res.status(400).json({
                actionStatus: "Error",
                error
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Sever error`
        })
    }
}


module.exports = {
    createCourtOwnerAccount,
    updateCourtOwnerAccount,
    deleteCourtOwnerAccount,
    loginCourtOwner,
    verifyCourtOwnerAccount,
    blockCourtOwnerAccount,
    unblockCourtOwnerAccount,
}