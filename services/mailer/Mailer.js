const nodemailer = require('nodemailer');
const config = require('../../config/mailer.json')

class Mailer {
    
    constructor() {
        this.transporter = nodemailer.createTransport(config)
    }

    async sendEmail(mailData) {
        try {
            this.transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    return {
                        actionStatus: false,
                        status: 400,
                        message: "Mail is not sent!",
                        body: error
                    }
                } else {
                    return {
                        actionStatus: true,
                        status: 200,
                        message: "Mail is sent to the user.",
                        body: info.response
                    } 
                }
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