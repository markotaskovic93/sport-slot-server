const bcrypt = require('bcrypt')
const Court_owner = require('../models/').Court_owner


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
        let generatedID = Math.floor(Math.random()*9000000000) + 1000000000
        return await Court_owner.create({
            id: generatedID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            personal_id: req.body.personal_id,
            password: hashedPassword,
            verified: false,
            blocked: false,
            role: 'court_owner'
        }).then(courtOwner => {
            return res.status(200).json(courtOwner)
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
                verified: false,
                blocked: false,
                role: 'court_owner'
            }, {
                where: {
                    id: req.body.id
                }
            }).then(courtOwner => {
                return res.status(200).json(courtOwner)
            })
            .catch(error => {
                return res.status(400).json(error)
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
            return res.status(200).json(courtOwner)
        })
        .catch(error => {
            return res.status(400).json({
                message: "Cant delete Court Owner account"
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: `Server error: ${error}`
        })
    }
    
}


module.exports = {
    createCourtOwnerAccount,
    updateCourtOwnerAccount,
    deleteCourtOwnerAccount,
    loginCourtOwner
}