import React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const DARK = "#1e3a5f";
const BLUE = "#3b82f6";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

export interface ContactNotificationEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function ContactNotificationEmail({ name, email, subject, message }: ContactNotificationEmailData) {
  return (
    <Html>
      <Head />
      <Preview>New portfolio contact from {name}</Preview>
      <Body style={{ backgroundColor: "#F9FAFB", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: DARK, padding: "32px 40px" }}>
            <Text style={{ color: "#ffffff", fontSize: "20px", fontWeight: "700", margin: "0 0 2px" }}>
              Evan Reilly
            </Text>
            <Text style={{ color: MUTED, fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
              New Contact Form Submission
            </Text>
          </Section>

          {/* Alert */}
          <Section style={{ padding: "28px 40px 8px" }}>
            <Text style={{ color: DARK, fontSize: "20px", fontWeight: "700", margin: "0 0 8px" }}>
              New message received
            </Text>
            <Text style={{ color: MUTED, fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
              Someone just submitted your portfolio contact form. Here are the details:
            </Text>
          </Section>

          {/* Details */}
          <Section style={{ padding: "20px 40px" }}>
            <Hr style={{ borderColor: BORDER, margin: "0 0 20px" }} />
            {[
              { label: "Name", value: name },
              { label: "Email", value: email },
              ...(subject ? [{ label: "Subject", value: subject }] : []),
            ].map(({ label, value }) => (
              <Section key={label} style={{ marginBottom: "12px" }}>
                <Text style={{ color: MUTED, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 2px" }}>
                  {label}
                </Text>
                <Text style={{ color: DARK, fontSize: "15px", fontWeight: "600", margin: 0 }}>
                  {value}
                </Text>
              </Section>
            ))}

            <Hr style={{ borderColor: BORDER, margin: "16px 0" }} />
            <Text style={{ color: MUTED, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>
              Message
            </Text>
            <Text style={{ color: DARK, fontSize: "14px", lineHeight: "1.7", margin: 0, padding: "12px 16px", backgroundColor: "#F9FAFB", borderRadius: "6px", borderLeft: `3px solid ${BLUE}` }}>
              {message}
            </Text>
          </Section>

          {/* Reply prompt */}
          <Section style={{ padding: "0 40px 32px" }}>
            <Hr style={{ borderColor: BORDER, margin: "0 0 20px" }} />
            <Text style={{ color: MUTED, fontSize: "13px", lineHeight: "1.7", margin: 0 }}>
              Reply directly to this email to reach{" "}
              <span style={{ color: DARK, fontWeight: "600" }}>{name}</span> at{" "}
              <span style={{ color: DARK, fontWeight: "600" }}>{email}</span>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: DARK, padding: "24px 40px" }}>
            <Text style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700", margin: "0 0 4px" }}>
              Evan Reilly
            </Text>
            <Hr style={{ borderColor: "#374151", margin: "12px 0" }} />
            <Text style={{ color: "#4B5563", fontSize: "10px", margin: 0 }}>
              © {new Date().getFullYear()} Evan Reilly. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
