const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", 
  port: 587,
  secure: false,
  auth: {
    user: "yarlprops@outlook.com", 
    pass: "P5p@2024", 
  },
});


module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .send({ success: false, message: "Method not allowed" });
  }

  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "yarlprops@outlook.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .send({
        success: false,
        message: "Failed to send email.",
        error: error.message,
      });
  }
};
