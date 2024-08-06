require('dotenv').config()
const nodemailer = require("nodemailer")
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.senderEmail,
      pass: process.env.emailPass
  }
});

function generateOTP(length = 6) {
  return crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
}


async function sendOTP(email,otp) {
    const mailOptions = {
      from: process.env.email,
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

async function sendOTPForgot(email,otp) {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'Your Password Reset Otp',
    text: `Your OTP code is ${otp} for changing your password. It is valid for the next 10 minutes.
            Verify it to change your password`
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
  sendOTP,
  sendOTPForgot
}