import nodemailer from 'nodemailer';

var mailer = nodemailer.createTransport({
    host: "mail.fantation-coin.com",
    port: 465,
    auth: {
        user: "info@fantation-coin.com",
        pass: "8UxFn8RkYnZ",
    }
});

export default mailer