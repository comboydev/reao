import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport({
    host: "mail.fantation-coin.com",
    port: 465,
    auth: {
        user: "info@fantation-coin.com",
        pass: "8UxFn8RkYnZ",
    }
});

export default mailer