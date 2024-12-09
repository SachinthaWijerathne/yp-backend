require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  console.log(process.env.EMAIL)
  console.log(process.env.PASSWORD)

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send({ success: false, message: "Method not allowed" });
  }

  const { to, subject, text } = req.body;

  if (!validateEmail(to)) {
    return res.status(400).send({ success: false, message: "Invalid email address." });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("This email service is currently on maintain mode")//"Error sending email:", error.stack || error);
    return res.status(500).send({
      success: false,
      message: "This email service is currently on maintain mode",//"Failed to send email.",
      //error:error,
    });
  }
};
