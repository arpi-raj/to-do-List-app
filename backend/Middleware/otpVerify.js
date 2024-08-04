const nodemailer = require("nodemailer")
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'er.arpitraj06@gmail.com',
      pass: 'nbcd qtyg xyzk mwgp'
  }
});

function generateOTP(length = 6) {
  return crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
}


async function sendOTP(email,otp) {
    const mailOptions = {
      from: 'er.arpitraj06@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for the next 10 minutes.`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    next()
});
}

module.exports ={
  generateOTP,
  sendOTP
}