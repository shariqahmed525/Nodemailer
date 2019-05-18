const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.user("/", (req, res) => {
  sendMail(req);
});

async function sendMail(req) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "madarsasadiqulislam@gmail.com",
      pass: "Pakistan123@"
    }
  });

  var mailOptions = {
    from: '"Madarsa Sadiq ul Islam"<madarsasadiqulislam@gmail.com>',
    to: req.body.email,
    subject: "Thanks for using Plai!",
    html: `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log("rejected: ", error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info.response);
      }
    });
  });
  // nodemailer.createTestAccount(async (err, account) => {
  //   const htmlEmail = `
  //       <h3>Contact Details</h3>
  //       <ul>
  //           <li>Name: ${req.body.name}</li>
  //           <li>Email: ${req.body.email}</li>
  //       </ul>
  //       <h3>Message</h3>
  //       <p>${req.body.message}</p>
  //     `;
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       // user: "alfonso.haley@ethereal.email",
  //       // pass: "PPsHTaT4WMkDzdhZhR"
  //       // user: "info@sadiqulislam.net",
  //       user: "madarsasadiqulislam@gmail.com",
  //       pass: "Pakistan123@"
  //     }
  //   });

  //   try {
  //     let info = await transporter.sendMail({
  //       from: `${req.body.name} <${req.body.email}>`, // sender address
  //       to: "madarsasadiqulislam@gmail.com", // list of receivers
  //       replyTo: req.body.email,
  //       subject: "New Message", // Subject line
  //       text: req.body.message, // plain text body
  //       html: htmlEmail // html body
  //     });

  //     transporter.sendMail(info, (err, infor) => {
  //       if (err) {
  //         return console.log(err);
  //       }

  //       console.log("Message sent %s", infor.messageId);
  //       console.log("Message url %s", nodemailer.getTestMessageUrl(infor));
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
}

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
