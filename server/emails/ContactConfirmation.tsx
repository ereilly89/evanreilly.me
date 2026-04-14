import React from "react";
import {
  Body,
  Button,
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

export interface ContactConfirmationEmailData {
  name: string;
  siteUrl: string;
}

export function ContactConfirmationEmail({ name, siteUrl }: ContactConfirmationEmailData) {
  const firstName = name.split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out — I'll get back to you soon.</Preview>
      <Body style={{ backgroundColor: "#F9FAFB", fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: DARK, padding: "32px 40px" }}>
            <Text style={{ color: "#ffffff", fontSize: "20px", fontWeight: "700", margin: "0 0 2px" }}>
              Evan Reilly
            </Text>
            <Text style={{ color: MUTED, fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", margin: 0 }}>
              Message Received
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "36px 40px 8px" }}>
            <Text style={{ color: DARK, fontSize: "22px", fontWeight: "700", margin: "0 0 16px" }}>
              Thanks for reaching out, {firstName}.
            </Text>
            <Text style={{ color: MUTED, fontSize: "15px", lineHeight: "1.7", margin: "0 0 12px" }}>
              I received your message and will get back to you as soon as possible — typically within{" "}
              <span style={{ color: DARK, fontWeight: "600" }}>1–2 business days</span>.
            </Text>
            <Text style={{ color: MUTED, fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
              In the meantime, feel free to reply to this email if you have anything to add.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={{ padding: "28px 40px 36px" }}>
            <Hr style={{ borderColor: BORDER, margin: "0 0 24px" }} />
            <Text style={{ color: MUTED, fontSize: "14px", lineHeight: "1.7", margin: "0 0 20px" }}>
              Want to see my work while you wait?
            </Text>
            <Button
              href={siteUrl}
              style={{
                backgroundColor: BLUE,
                color: "#ffffff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "700",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Portfolio →
            </Button>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: DARK, padding: "24px 40px" }}>
            <Text style={{ color: "#ffffff", fontSize: "14px", fontWeight: "700", margin: "0 0 4px" }}>
              Evan Reilly
            </Text>
            <Text style={{ color: MUTED, fontSize: "11px", margin: "0 0 4px" }}>
              Software Engineer
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

export default ContactConfirmationEmail;
