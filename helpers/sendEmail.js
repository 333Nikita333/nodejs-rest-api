const nodemailer = require("nodemailer");

require("dotenv").config();

const { ELASTICEMAIL_USERNAME, ELASTICEMAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 465,
  secure: true,
  auth: {
    user: ELASTICEMAIL_USERNAME,
    pass: ELASTICEMAIL_PASS,
  },
});

const sendEmail = async (data) => {
  const email = { ...data, from: ELASTICEMAIL_USERNAME };
  await transport.sendMail(email);
  console.log("Email send success");
  return true;
};

module.exports = sendEmail;
