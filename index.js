import "dotenv/config";
import nodemailer from "nodemailer";
import { existsSync } from "node:fs";
import { basename } from "node:path";

// CLI: node index.js <to> <pdfPath> [subject]
const [to, pdfPath, subject = "PDF attached"] = process.argv.slice(2);

if (!to || !pdfPath) {
  console.error("Usage: node index.js <to> <pdfPath> [subject]");
  process.exit(1);
}
if (!existsSync(pdfPath)) {
  console.error(`File not found: ${pdfPath}`);
  process.exit(1);
}

const provider = (process.env.PROVIDER || "resend").toLowerCase();

let transportConfig;
let from;

if (provider === "gmail") {
  transportConfig = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  };
  from = process.env.GMAIL_USER;
} else if (provider === "brevo") {
  transportConfig = {
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_SMTP_KEY,
    },
  };
  from = process.env.SENDER_EMAIL;
} else if (provider === "resend") {
  transportConfig = {
    host: "smtp.resend.com",
    port: 587,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  };
  from = process.env.SENDER_EMAIL;
} else {
  console.error(`Unknown PROVIDER: ${provider} (use gmail, brevo or resend)`);
  process.exit(1);
}

const transporter = nodemailer.createTransport(transportConfig);

const info = await transporter.sendMail({
  from,
  to,
  subject,
  text: "See attached PDF.",
  attachments: [{ filename: basename(pdfPath), path: pdfPath }],
});

console.log(`Sent: ${info.messageId}`);
