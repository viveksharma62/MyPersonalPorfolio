const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
  const { email, number, name, message } = req.body;

  if (!email || !number || !name || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.TO_MAIL,
      subject: `Message from: ${email}`,
      html: `
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <h3>Mobile: ${number}</h3>
        <p>Message: ${message}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    return res.status(200).json({ status: 'success', message: 'Email sent' });

  } catch (error) {
    console.error('❌ Email error:', error);
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
});

module.exports = router;
