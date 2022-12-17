const nodemailer = require('nodemailer');
const pug = require('pug');

let def;

class MailSender {
    constructor(userSender) {
        if (def) throw new Error("Double call")
        this.user = userSender.user;
        this.pass = userSender.pass;

        this.setTransport(userSender)
        def = this;
    }



    setTransport(user) {
        this.transporter = nodemailer.createTransport({
            host: user.host,
            port: user.port,
            secure: user.secure,
            auth: {
                user: user.user,
                pass: user.pass
            }
        })
    }

    async sendHello(receiver, subject, html) {
        const response = await this.transporter.sendMail({
            from: this.user,
            to: receiver,
            subject: subject,
            html: html
        })

        return response.response.includes("Ok")
    }

    async sendRecover(receiver, subject, html) {
        const response = await this.transporter.sendMail({
            from: this.user,
            to: receiver,
            subject: subject,
            html: html
        })

        return response.response.includes("Ok")
    }
}

function getMailer(userSender) {
    return def || new MailSender(userSender)
}

module.exports = getMailer;
