const nodemailer = require('nodemailer');
const BaseManager = require('../BaseManager');

class EmailManager extends BaseManager {
    constructor(options) {
        super(options);
       
        this.mediator.set(this.TRIGGERS.SEND_EMAIL, data => this.sendMail(data));
    }

    sendMail(data) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: this.EMAIL,
                pass: this.PASSWORD
            }
        })
        // setup email data with unicode symbols
        let mailOptions = {
            from: `Библиотека Онлайн <${this.EMAIL}>`, // sender address
            to: data.reciever, // list of receivers
            subject: data.subject, // Subject line
            text: data.text
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }

}

module.exports = EmailManager;