"use strict";
require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

// Body middleware
app.use(express.json());

app.use("/", (req) => {
  const { email, name, message } = req.body;
  sendMail(email, name, message);
});

async function sendMail(email, name, message) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    tls: 587,
    port: 465,
    service: "Gmail",
    auth: {
      user: "your email",
      pass: "your password"
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
    to: "realisticcleaning1@gmail.com",
    subject: name,
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
        resolve(info.response);
      }
    });
  });
}


// define Port
const port = process.env.PORT || 5000;

// port listen
app.listen(port, () => console.log(`Server started on port ${port}`));