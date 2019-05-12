const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/sendmail", async (req, res) => {
  sendMail(req);
});

async function sendMail(req) {
  nodemailer.createTestAccount(async (err, account) => {
    const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        // user: "alfonso.haley@ethereal.email",
        // pass: "PPsHTaT4WMkDzdhZhR"
        user: "shariqrough@gmail.com",
        pass: "Pakistan123@"
      }
    });

    try {
      let info = await transporter.sendMail({
        from: `${req.body.name} <${req.body.email}>`, // sender address
        to: "shariqrough@gmail.com", // list of receivers
        replyTo: req.body.email,
        subject: "New Message", // Subject line
        text: req.body.message, // plain text body
        html: htmlEmail // html body
      });

      transporter.sendMail(info, (err, infor) => {
        if (err) {
          return console.log(err);
        }

        console.log("Message sent %s", infor.messageId);
        console.log("Message url %s", nodemailer.getTestMessageUrl(infor));
      });
    } catch (err) {
      console.log(err);
    }
  });
}

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
