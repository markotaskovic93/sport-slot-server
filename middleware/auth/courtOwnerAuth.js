const jwt = require('jsonwebtoken')

const courtOwnerAuth = (req, res, next) => {
    const bearerToken = req.headers['authorization']
    if(typeof bearerToken !== 'undefined') {
        const bearer = bearerToken.split(" ")
        const token = bearer[1]
        jwt.verify(token, 'secretkey', (error, authData) => {
            if(error) {
                return res.status(403).json({
                    message: "Token doesn't exist"
                })
            } else {
                next()
            }
        })
    } else {
        return res.status(403).json({
            message: "Forbiden"
        })
    }
}

module.exports = courtOwnerAuth