import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4, // Force IPv4
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(to, subject, text) {
  try {
    console.log("Sending email to:", to);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    // console.log("EMAIL SENT SUCCESSFULLY ✅");
    // console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.log("EMAIL ERROR ❌");
    console.log(error);
    throw error;
  }
}