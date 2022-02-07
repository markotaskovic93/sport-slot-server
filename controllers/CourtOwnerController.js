const bcrypt = require('bcrypt')
const Court_owner = require('../models/').Court_owner

const jwt = require('jsonwebtoken')


class CourtOwnerController {

    static async loginCourtOwner(req, res) {
        try {
            const { email, password } = req.body
            const courtOwnerExist = await Court_owner.login(email)
            if(courtOwnerExist.actionStatus) {
                let verifiedPassword = bcrypt.compareSync(password, courtOwnerExist.body.password.trim()) // trim remove all white spaces from both sides of password
                if(verifiedPassword){
                    courtOwnerExist.isLogged = true
                    jwt.sign({
                        courtOwnerExist
                    }, 'secretkey', (error, token) => {
                        return res.status(200).json({courtOwnerExist, token})
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
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    } // login

    static async createCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.storeCourtOwnerData(req.body)
            // const mailer = new Mailer()
            // const email = await mailer.sendEmail()
            //if(email.actionStatus) {
            return res.status(response.status).json(response)
            //} else {
                // TODO: What will happens here
            //}
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    } // sign up

    static async updateCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.updateCourtOwnerData(req.body)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

    static async getCourtOwnerByID(req, res) {
        try {
            const { id } = req.params
            const response = await Court_owner.getCourtOwnerById(id)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

    static async deleteCourtOwnerAccount(req, res) {
        try {
            const response = await Court_owner.deleteCourtOwner(req.params)
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(400).json({
                actionStatus: false,
                status: 403,
                message: "Error rised",
                body: error 
            })
        }
    }

}

module.exports = CourtOwnerController























// const loginCourtOwner = async (req, res) => {
//     let courtOwner = await Court_owner.findOne({
//         where: {
//             email: req.body.username
//         }
//     })
//     if(courtOwner) {
//         let verifiedPassword = bcrypt.compareSync(req.body.password, courtOwner.password.trim()) // trim remove all white spaces from both sides of password
//         if(verifiedPassword){
//             jwt.sign({
//                 courtOwner
//             }, 'secretkey', (error, token) => {
//                 return res.status(200).json({courtOwner, token})
//             })
//         } else {
//             return res.status(400).json({
//                 message: "Password is not correct"
//             })
//         }
//     } else {
//         return res.status(400).json({
//             message: "Can't find accout with this credentials"
//         })
//     }
// }

// const createCourtOwnerAccount = async (req, res) => {
//     try {
//         let hashedPassword = bcrypt.hashSync(req.body.password, 8)
//         let generatedID = IDGenerator()
//         return await Court_owner.create({
//             id: generatedID,
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             birthday: req.body.birthday,
//             email: req.body.email,
//             address: req.body.address,
//             state: req.body.state,
//             city: req.body.city,
//             street: req.body.street,
//             phone: req.body.phone,
//             personal_id: req.body.personal_id,
//             password: hashedPassword,
//             verified: false,
//             blocked: false,
//             role: 'court_owner'
//         }).then(courtOwner => {
//             return res.status(200).json({
//                 actionStatus: "Success",
//                 courtOwner
//             })
//         }).catch(error => {
//             return res.status(400).json({
//                 actionStatus: "Error",
//                 error
//             })
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: `Server error: ${error}`
//         }) 
//     }
// }

// const updateCourtOwnerAccount = async (req, res) => {
//     try {
//         const courtOwner = await Court_owner.findByPk(req.body.id)
//         if(courtOwner) {
//             return await Court_owner.update({
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 birthday: req.body.birthday,
//                 address: req.body.address,
//                 phone: req.body.phone,
//                 personal_id: req.body.personal_id,
//                 role: 'court_owner'
//             }, {
//                 where: {
//                     id: req.body.id
//                 }
//             }).then(courtOwner => {
//                 return res.status(200).json({
//                     actionStatus: "Success",
//                     courtOwner
//                 })
//             })
//             .catch(error => {
//                 return res.status(400).json({
//                     actionStatus: "Error",
//                     error
//                 })
//             })
//         } else {
//             return res.status(400).json({
//                 message: `Court owner with id ${req.body.id} dosn't exist in the collection`
//             })
//         }  
//     } catch (error) {
//         return res.status(500).json({
//             message: `Server error: ${error}`
//         }) 
//     }
// }

// const deleteCourtOwnerAccount = async (req, res) => {
//     try {
//         return await Court_owner.destroy({
//             where: {
//                 id: req.body.id
//             }
//         }).then((courtOwner) => {
//             return res.status(200).json({
//                 actionStatus: "Success",
//                 courtOwner
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 actionStatus: "Error",
//                 error
//             })
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: `Server error: ${error}`
//         })
//     }
// }

// const getBlockedCourtOwners = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 blocked: true
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getBlockedCourtOwnersByState = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 blocked: true,
//                 state: req.params.state
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getUnblockedCourtOwners = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 blocked: false
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getUnblockedCourtOwnersByState = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 blocked: false,
//                 state: req.params.state
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getVerifiedCourtOwners = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 verified: true
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getVerifiedCourtOwnersByState = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 verified: true,
//                 state: req.params.state
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getUnverifiedCourtOwners = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 verified: false
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const getUnverifiedCourtOwnersByState = async (req, res) => {
//     try {
//         return await Court_owner.findAll({
//             where: {
//                 verified: false,
//                 state: req.params.state
//             }
//         }).then(courtOwners => {
//             return res.status(200).json(courtOwners)
//         }).catch(error => {
//             return res.status(400).json(error)
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }

// const verifyCourtOwnerAccount = async (req, res) => {
//     try {   
//         return await Court_owner.update({
//             verified: true
//         }, {
//             where: {
//                 id: req.params.id
//             }
//         }).then(courtOwner => {
//             return res.status(200).json({
//                 actionStatus: "Success",
//                 courtOwner
//             })
//         }).catch(error => {
//             return res.status(400).json({
//                 actionStatus: "Error",
//                 error
//             })
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: `Sever error`
//         })
//     }   
// }

// const blockCourtOwnerAccount = async (req, res) => {
//     try {
//         return await Court_owner.update({
//             blocked: true
//         }, {
//             where: {
//                 id: req.params.id
//             }
//         }).then(courtOwner => {
//             return res.status(200).json({
//                 actionStatus: "Success",
//                 courtOwner
//             })
//         }).catch(error => {
//             return res.status(400).json({
//                 actionStatus: "Error",
//                 error
//             })
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: `Sever error`
//         })
//     }
// }

// const unblockCourtOwnerAccount = async (req, res) => {
//     try {
//         return await Court_owner.update({
//             blocked: false
//         }, {
//             where: {
//                 id: req.params.id
//             }
//         }).then(courtOwner => {
//             return res.status(200).json({
//                 actionStatus: "Success",
//                 courtOwner
//             })
//         }).catch(error => {
//             return res.status(400).json({
//                 actionStatus: "Error",
//                 error
//             })
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: `Sever error`
//         })
//     }
// }


// module.exports = {
//     createCourtOwnerAccount,
//     updateCourtOwnerAccount,
//     deleteCourtOwnerAccount,
//     loginCourtOwner,
//     getBlockedCourtOwners,
//     getBlockedCourtOwnersByState,
//     getUnblockedCourtOwners,
//     getUnblockedCourtOwnersByState,
//     getVerifiedCourtOwners,
//     getVerifiedCourtOwnersByState,
//     getUnverifiedCourtOwners,
//     getUnverifiedCourtOwnersByState,
//     verifyCourtOwnerAccount,
//     blockCourtOwnerAccount,
//     unblockCourtOwnerAccount,
// }