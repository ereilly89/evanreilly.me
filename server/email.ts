import nodemailer from 'nodemailer';
import type { Contact } from '@shared/schema';

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

function getSMTPConfig(): SMTPConfig {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.SMTP_TO;

  if (!user || !pass || !from || !to) {
    console.log("user: ", user)
    console.log("pass: ", pass)
    console.log("from: ", from)
    console.log("to: ", to)
    throw new Error('Missing required SMTP configuration. Please check your environment variables.');
  }

  return { host, port, secure, user, pass, from, to };
}

export async function sendContactEmail(contact: Contact): Promise<void> {
  const config = getSMTPConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const subject = contact.subject 
    ? `Portfolio Contact: ${contact.subject}` 
    : 'New Portfolio Contact Form Submission';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #475569; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        ${contact.subject ? `<p><strong>Subject:</strong> ${contact.subject}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
      </div>

      <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h3 style="color: #475569; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          This message was sent from your portfolio website contact form.
        </p>
      </div>
    </div>
  `;

  const textContent = `
New Contact Form Submission

Name: ${contact.name}
Email: ${contact.email}
${contact.subject ? `Subject: ${contact.subject}` : ''}
Submitted: ${new Date(contact.createdAt).toLocaleString()}

Message:
${contact.message}

---
This message was sent from your portfolio website contact form.
  `;

  const mailOptions = {
    from: `"${contact.name}" <${config.from}>`,
    to: config.to,
    replyTo: contact.email,
    subject,
    text: textContent,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}

export function isEmailConfigured(): boolean {
  try {
    getSMTPConfig();
    return true;
  } catch {
    return false;
  }
}
