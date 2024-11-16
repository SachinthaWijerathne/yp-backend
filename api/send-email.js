const nodemailer = require('nodemailer');

// Nodemailer transporter setup 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'slsachiboy.yt@gmail.com', // Replace with your Gmail
        pass: 'clgl mrci ctlp sgzv',   // Replace with your App Password
    },
});

// Export the handler as a serverless function
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    if (req.method !== 'POST') {
        return res.status(405).send({ success: false, message: 'Method not allowed' });
    }

    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'slsachiboy.yt@gmail.com', // Sender address
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ success: false, message: 'Failed to send email.', error: error.message });
    }
};