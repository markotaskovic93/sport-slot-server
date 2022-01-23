const Joi = require('joi')

const searchValidation = Joi.object({
    params: {
        sport: Joi.string().required(),
        date: Joi.string().required(),
        start_time: Joi.string().required(),
        location: Joi.string().required(),
        court_enviroment: Joi.string().required(),
        payment_type: Joi.string().required()
    }
})

module.exports = { 
    searchValidation 
}


        