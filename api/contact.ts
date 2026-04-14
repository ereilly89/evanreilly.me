import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1, "Please provide your name"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Please provide a message"),
});

function buildConfirmationHtml(name: string): string {
  const firstName = name.split(" ")[0];
  const siteUrl = process.env.SITE_URL ?? "https://evanreilly.me";
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
      <div style="background:#1e3a5f;padding:32px 40px;">
        <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 4px;">Evan Reilly</p>
        <p style="color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0;">Message Received</p>
      </div>
      <div style="padding:36px 40px 24px;">
        <p style="color:#1e3a5f;font-size:22px;font-weight:700;margin:0 0 16px;">Thanks for reaching out, ${firstName}.</p>
        <p style="color:#6B7280;font-size:15px;line-height:1.7;margin:0 0 12px;">
          I received your message and will get back to you as soon as possible — typically within
          <strong style="color:#1e3a5f;">1–2 business days</strong>.
        </p>
        <p style="color:#6B7280;font-size:15px;line-height:1.7;margin:0;">
          In the meantime, feel free to reply to this email if you have anything to add.
        </p>
      </div>
      <div style="padding:0 40px 36px;">
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 24px;"/>
        <p style="color:#6B7280;font-size:14px;margin:0 0 20px;">Want to see my work while you wait?</p>
        <a href="${siteUrl}" style="background:#3b82f6;color:#ffffff;border-radius:8px;padding:12px 24px;font-size:14px;font-weight:700;text-decoration:none;display:inline-block;">
          View Portfolio →
        </a>
      </div>
      <div style="background:#1e3a5f;padding:24px 40px;">
        <p style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 4px;">Evan Reilly</p>
        <p style="color:#6B7280;font-size:11px;margin:0 0 12px;">Software Engineer</p>
        <hr style="border:none;border-top:1px solid #374151;margin:0 0 12px;"/>
        <p style="color:#4B5563;font-size:10px;margin:0;">© ${new Date().getFullYear()} Evan Reilly. All rights reserved.</p>
      </div>
    </div>
  `;
}

function buildNotificationHtml(name: string, email: string, subject: string | undefined, message: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
      <div style="background:#1e3a5f;padding:32px 40px;">
        <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 4px;">Evan Reilly</p>
        <p style="color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0;">New Contact Form Submission</p>
      </div>
      <div style="padding:28px 40px 8px;">
        <p style="color:#1e3a5f;font-size:20px;font-weight:700;margin:0 0 8px;">New message received</p>
        <p style="color:#6B7280;font-size:14px;line-height:1.7;margin:0;">Someone just submitted your portfolio contact form.</p>
      </div>
      <div style="padding:20px 40px;">
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 20px;"/>
        <p style="color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px;">Name</p>
        <p style="color:#1e3a5f;font-size:15px;font-weight:600;margin:0 0 16px;">${name}</p>
        <p style="color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px;">Email</p>
        <p style="color:#1e3a5f;font-size:15px;font-weight:600;margin:0 0 16px;">${email}</p>
        ${subject ? `
        <p style="color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 2px;">Subject</p>
        <p style="color:#1e3a5f;font-size:15px;font-weight:600;margin:0 0 16px;">${subject}</p>
        ` : ""}
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 16px;"/>
        <p style="color:#6B7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Message</p>
        <p style="color:#1e3a5f;font-size:14px;line-height:1.7;margin:0;padding:12px 16px;background:#F9FAFB;border-radius:6px;border-left:3px solid #3b82f6;white-space:pre-wrap;">${message}</p>
      </div>
      <div style="padding:0 40px 32px;">
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 20px;"/>
        <p style="color:#6B7280;font-size:13px;line-height:1.7;margin:0;">
          Reply directly to this email to reach <strong style="color:#1e3a5f;">${name}</strong> at <strong style="color:#1e3a5f;">${email}</strong>.
        </p>
      </div>
      <div style="background:#1e3a5f;padding:24px 40px;">
        <p style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 12px;">Evan Reilly</p>
        <hr style="border:none;border-top:1px solid #374151;margin:0 0 12px;"/>
        <p style="color:#4B5563;font-size:10px;margin:0;">© ${new Date().getFullYear()} Evan Reilly. All rights reserved.</p>
      </div>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = contactSchema.parse(req.body);

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.RESEND_TO;

    if (apiKey && from && to) {
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from,
        to: email,
        replyTo: to,
        subject: `Got your message, ${name.split(" ")[0]}!`,
        html: buildConfirmationHtml(name),
      });

      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: subject ? `Portfolio contact: ${subject}` : `New portfolio contact from ${name}`,
        html: buildNotificationHtml(name, email, subject, message),
      }).catch((err: unknown) => console.error("[contact] notification email failed", err));
    }

    res.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Please fill in all required fields correctly.",
        errors: error.errors,
      });
    } else {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  }
}
