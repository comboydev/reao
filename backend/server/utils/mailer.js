import nodemailer from 'nodemailer';

var Mailer = nodemailer.createTransport({
    host: "mail.fantation-coin.com",  // More at https://nodemailer.com/smtp/well-known/#supported-services
    port: 465,
    auth: {
        user: "info@fantation-coin.com",
        pass: "8UxFn8RkYnZ",
    }
});

export default Mailer