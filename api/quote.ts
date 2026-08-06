import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, product, message } = req.body || {};

  // Initialize Nodemailer with Titan Mail SMTP settings from Vercel ENV
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'info@vtelsolution.com',
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Quote Request" <${process.env.SMTP_USER || 'info@vtelsolution.com'}>`,
      to: 'info@vtelsolution.com', // Recipient
      replyTo: email, // Visitor's email
      subject: `New Quote Request for ${product || 'Telecom GIS Data'}`,
      html: `
        <h3>New Quote Request Received</h3>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Message/Requirements:</strong> ${message || 'N/A'}</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Quote request sent!' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
