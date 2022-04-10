const nodemailer = require('nodemailer');
const config = require('../../config/mailer.json')

class Mailer {
    
    static sendEmail(email) {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "markotaskovic93@gmail.com", // generated ethereal user
                pass: "markomiljana08031907", // generated ethereal password
            },
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: '"Sport Slot app" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Account verificaiton", // Subject line
            text: `This is activation message from Sport Slot app`, // plain text body
            html: `<a target='_blank' href='http://localhost:3000/api/v1/player/verify-email/${email}'>Click here to activate your account!</a>`,
        }, (err) => {
            if (err) {
                return false
            } else {
                return true
            }
        });
    }

}

module.exports = Mailer