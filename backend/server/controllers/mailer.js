import nodemailer from 'nodemailer';
import mailerhbs from 'nodemailer-express-handlebars';

var mailer = /*nodemailer.createTransport({
    host: "e1.valueserver.jp",  // More at https://nodemailer.com/smtp/well-known/#supported-services
    port: 25,
    auth: {
        user: "support@fantaion-coin.com", // Your email id
        pass: "ZE9y3U6YcaEG" // Your password
    }
});*/
nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kanazawaryostar@gmail.com',
        pass: 'P@ssw0rd!@#'
    }
});

var mailer_reg = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'YStar19981123@gmail.com',
        pass: '19980501$'
    }
});


export default {
    mailer,
    mailer_reg
}