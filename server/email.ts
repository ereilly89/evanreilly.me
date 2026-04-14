import { Resend } from "resend";
import { ContactConfirmationEmail } from "./emails/ContactConfirmation";
import { ContactNotificationEmail } from "./emails/ContactNotification";
import type { Contact } from "@shared/schema";

const SITE_URL = process.env.SITE_URL ?? "https://evanreilly.me";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

export async function sendContactEmails(contact: Contact): Promise<void> {
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;

  if (!from || !to) {
    throw new Error("RESEND_FROM or RESEND_TO is not set");
  }

  const resend = getResend();

  // Send confirmation to the person who submitted the form
  const { error: confirmError } = await resend.emails.send({
    from,
    to: contact.email,
    replyTo: to,
    subject: `Got your message, ${contact.name.split(" ")[0]}!`,
    react: ContactConfirmationEmail({ name: contact.name, siteUrl: SITE_URL }),
  });

  if (confirmError) {
    console.error("[contact] confirmation email failed", confirmError);
    throw new Error("Failed to send confirmation email");
  }

  // Send notification to site owner
  const { error: notifyError } = await resend.emails.send({
    from,
    to,
    replyTo: contact.email,
    subject: contact.subject
      ? `Portfolio contact: ${contact.subject}`
      : `New portfolio contact from ${contact.name}`,
    react: ContactNotificationEmail({
      name: contact.name,
      email: contact.email,
      subject: contact.subject ?? undefined,
      message: contact.message,
    }),
  });

  if (notifyError) {
    console.error("[contact] notification email failed", notifyError);
    // Don't fail the request — confirmation already sent
  }
}

export function isEmailConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM && process.env.RESEND_TO);
}
