const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


// configure authentication.
const auth = {
    auth: {
        api_key:  'Add your api_key here from mailgun', //'01111111111111111111111111-111111-111111',
        domain:  'Add your domain info here' //'sandbox00000000000000000000000.mailgun.org' 
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

// Send the email.
const sendMail = (email, subject, text, cb) => {
   
    // configure options for mail.
    // ES6
    const mailOptions= {
        from:  email, // 'test@test.com',
        to: 'xyz@gmail.com', // This is the fixed email id which is authorized nd activated by mailGun.
        subject, //'Test email...',
        text //'Hello, this is my first test email using nodemailer and mailGun'
    };
    // const mailOptions= {
    //     from:  email, // 'test@test.com',
    //     to: 'talvindersingh.ca@gmail.com', // This is the fixed email id which is authorized nd activated by mailGun.
    //     subject: subject, //'Test email...',
    //     text: text //'Hello, this is my first test email using nodemailer and mailGun'
    // };

    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            cb(err, null);
            //console.log('An error occured while sending the email.');
        } else {
            cb(null, data);
            //console.log('email sent successfully.');
        }
    });
}

// export the sendMail method to others.
module.exports = sendMail;

