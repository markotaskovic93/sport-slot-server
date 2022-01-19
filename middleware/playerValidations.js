const { Joi } = require('express-validation')

const createPlayerValidation = {
    body: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        birthday: Joi.string().required(),
        height: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        bio: Joi.string(),
        verified: Joi.boolean(),
        blocked: Joi.boolean(),
        role: 'player',
    })
}

module.exports = {
    createPlayerValidation
}