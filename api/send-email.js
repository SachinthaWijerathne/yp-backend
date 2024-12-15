require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:'gmail',
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
    return res.status(500).send({
      success: false,
      message: "Failed to send email, Try again later",
      error:error,
    });
  }
};
