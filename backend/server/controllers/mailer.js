import nodemailer from 'nodemailer';

var mailer_reg =nodemailer.createTransport({
    host: "mail.fantation-coin.com",  // More at https://nodemailer.com/smtp/well-known/#supported-services
    port: 465,
    auth: {
        user: "info@fantation-coin.com", // Your email id
        pass: "8UxFn8RkYnZ" // Your password
    }
});

// var mailer_reg = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com', 
//     auth: {
//         user: 'fantation2022@gmail.com',
//         pass: 'fant2022'
//     }
// });

export default {
    mailer_reg
}