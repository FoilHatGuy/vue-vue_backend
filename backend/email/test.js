const nodemailer = require("nodemailer");
const pug = require("pug");
const MailSender = require('./sender.js')

async function send(user) {
    let transporter = nodemailer.createTransport( {
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: "app.vue@yandex.ru",
            pass: "emrzqcpijhwucsqd"
        }
    });

    let response = await transporter.sendMail({
        from: "app.vue@yandex.ru",
        to: "app.vue@yandex.ru",
        subject: "Спасибо за регистарцию",
        html: pug.renderFile('helloLetter.pug', {site: "somelink.com", login: user.login, password: user.password})
    });

    console.log("message is sent", response)
}

// send({login: "SuperMacho", password: "SuperCool"})
let newClass = new MailSender({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    user: "app.vue@yandex.ru",
    pass: "emrzqcpijhwucsqd"
});
newClass.sendHello("antony.aleynikov@gmail.com", "Спасибо за регистарцию",
    pug.renderFile('helloLetter.pug', {site: "somelink.com", login: "Login", password: "Password"}))