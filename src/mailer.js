import nodemailer from "nodemailer";
import "dotenv/config";
import { ENV } from "./config.js";

export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS
    }
  });

  return await transporter.sendMail({
    from: "Mầm non Hồng Phúc",
    to: to,
    subject: subject,
    html: html
  });
}
