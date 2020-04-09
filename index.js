"use strict";
require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

// Body middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/", (req, res) => {
  sendMail(req.body, res);
});

async function sendMail({ email, name, subject, message }, res) {
  console.log('name ===> ', name);
  console.log('email ===> ', email);
  console.log('subject ===> ', subject);
  console.log('message ===> ', message);
  var transporter = nodemailer.createTransport({
    // Gmail Configuration
    // host: "smtp.gmail.com",
    // tls: 587,
    // port: 465,
    // service: "Gmail",
    // auth: {
    //   user: "email address",
    //   pass: "password"
    // },

    // GoDaddy Configuration
    // host: "smtp.office365.com",
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: 'SSLv3'
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: "email address",
      pass: "password"
    },
  });

  var html = `
        <h3>Message</h3>
        <p>${message}</p>
      `;

  var mailOptions = {
    from: {
      name,
      address: email
    },
    to: "info@realisticcleaning.com",
    subject: subject,
    html: html,
    replyTo: email,
    sender: email,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("rejected: ", error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        res.json({ message: `Email sent: ${info.response}` })
        resolve(info.response);
      }
    });
  });
}


// define Port
const port = process.env.PORT || 5000;

// port listen
app.listen(port, () => console.log(`Server started on port ${port}`));
