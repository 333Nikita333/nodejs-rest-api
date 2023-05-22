const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { ELASTICEMAIL_USERNAME, ELASTICEMAIL_PASS } = process.env;
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const transport = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 465,
  secure: true,
  auth: {
    user: ELASTICEMAIL_USERNAME,
    pass: ELASTICEMAIL_PASS,
  },
});

const email = {
  from: ELASTICEMAIL_USERNAME,
  to: "wivaf83827@duscore.com",
  subject: "Testing mail",
  html: "<p>Hello there this is testing email from localhost:3000!</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log("Error:", error.message));

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
