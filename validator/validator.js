const Validator = require('validatorjs');

class InputDataValidator {
    constructor(data, rule) {
        this.validationRules = this.getValidationRule(rule)
        this.validator = new Validator(data, this.validationRules[0].validationData)
        console.log(this.validationRules[0].validationData)
    }

    passed() {
        return this.validator.passes()
    }

    getValidationRule(ruleName) {
        const rules = [
            {
                validation_name: "brrrm",
                validationData: {
                    first_name: "string",
                    last_name: "string",
                    birthday: "string",
                    height: "number",
                    email: "email|required",
                    address: "string",
                    state: "string",
                    city: "string",
                    street: "string",
                    phone: "string",
                    password: "required|string|min:6"
                }
            },{
                validation_name: "blabla",
                validationData: {
                    first_name: "string",
                    last_name: "string",
                    birthday: "string",
                    height: "string",
                    email: "email|required",
                    address: "string",
                    state: "string",
                }
            } 
        ]
        let response = rules.filter(rule => rule.validation_name === ruleName)
        return response
    }
    
}

module.exports = InputDataValidator