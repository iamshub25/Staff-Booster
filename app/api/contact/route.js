import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message, recaptchaToken } = await request.json();

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });
    
    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success) {
      return Response.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
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
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}