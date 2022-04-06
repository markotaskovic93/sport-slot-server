const nodemailer = require('nodemailer');
const config = require('../../config/mailer.json')

class Mailer {
    
    constructor() {
        this.transporter = nodemailer.createTransport(config)
    }

    async sendEmail() {
        try {
            this.transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "markotaskovic93@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              })
        } catch (error) {
            return {
                actionStatus: false,
                status: 500,
                message: "Error in mail service",
                body: error
            } 
        }
    }

}

module.exports = Mailer