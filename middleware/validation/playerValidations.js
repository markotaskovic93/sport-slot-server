const Joi = require('joi')

const createPlayerValidation = Joi.object({
    full_name: Joi.string().required(),
    birthday: Joi.string().required(),
    height: Joi.string().required(),
    email: Joi.string().email().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.string(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    bio: Joi.string(),
    sport: Joi.string().required(),
    terms: Joi.boolean()
})

const updatePlayerValidation = Joi.object({
    body: Joi.object({
        id: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        birthday: Joi.string().required(),
        height: Joi.string().required(),
        email: Joi.string().email().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.string(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        bio: Joi.string(),
        sport: Joi.string().required(),
        terms: Joi.boolean(),
    })
})

const getPlayerByID = Joi.object({
    params: Joi.object({
        id: Joi.string().required()
    })
})

module.exports = { 
    createPlayerValidation,
    updatePlayerValidation,
    getPlayerByID 
}