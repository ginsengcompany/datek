const mailer = require('nodemailer');

async function invioMail(indirizzo, soggetto, testo) {
    const vector = mailer.createTransport({
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ak12sviluppo@gmail.com',
            pass: 'ak12srl2019!'
        }
    });
    try{
        const info = await vector.sendMail({
            from: '"Servizio reset password" <reset@gmail.com>',
            to: indirizzo,
            subject: soggetto,
            html: testo
        });
        console.log(info);
    }catch (e) {
        console.log(e);
    }
}

module.exports.invioMail = invioMail;