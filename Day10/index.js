const express = require("express");
const nodemailer =require('nodemailer');

const app = express();

app.use(express.json());


app.get("/signup", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user: "chaitanyamailer@gmail.com",
        pass: "lvwi mjcl jauy oyek"
    },
  });

  let message = {
    from: "chaitanyamailer@gmail.com",
    to: "anveshakarn2405@gmail.com",
    subject: "Hello",
    text: "Hello world",
    html: "<b>Hello World?</b>",
  };
  let info = await transporter.sendMail(message);
  res.json(info);
});

app.listen(5000, () => {
  console.log("Server started");
});
