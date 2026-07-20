import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../config.env");
dotenv.config({ path: envPath });
dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded ✅" : "Not Loaded ❌"
);

const getMailConfig = () => {
  if (process.env.SENDGRID_API_KEY) {
    return {
      host: process.env.EMAIL_HOST || "smtp.sendgrid.net",
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    };
  }

  return {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
};

const transporter = nodemailer.createTransport(getMailConfig());

export default async function sendEmail(to, subject, text) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are not configured. Set EMAIL_USER and EMAIL_PASS in Render/hosting environment variables.");
    }

    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: `"SkyMart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email Error:", error);
    throw new Error(
      error.message || "Failed to send OTP email. Check EMAIL_USER and EMAIL_PASS in the hosting environment."
    );
  }
}