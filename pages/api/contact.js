import * as nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, mobile, subject, message, recaptchaToken } = req.body;
    console.log('API called with data:', { name, email, subject });

    // Verify reCAPTCHA
    console.log('Verifying reCAPTCHA...');
    console.log('Secret key exists:', !!process.env.RECAPTCHA_SECRET_KEY);
    console.log('Token received:', !!recaptchaToken);
    
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });
    
    const recaptchaData = await recaptchaResponse.json();
    console.log('reCAPTCHA response:', recaptchaData);
    
    if (!recaptchaData.success) {
      console.log('reCAPTCHA errors:', recaptchaData['error-codes']);
      return res.status(400).json({ 
        error: 'reCAPTCHA verification failed',
        details: recaptchaData['error-codes']
      });
    }
    
    // Create transporter (supports both Gmail and Outlook)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_USER.includes('outlook') || process.env.EMAIL_USER.includes('hotmail') 
        ? 'smtp-mail.outlook.com' 
        : 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shubhampra25@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Email Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}