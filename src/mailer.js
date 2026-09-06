import { Resend } from "resend";
import "dotenv/config";
import { ENV } from "./config.js";

const resend = new Resend(ENV.RESEND_API_KEY);

export async function sendEmail(to, subject, html) {
  const { data, error } = await resend.emails.send({
    from: "Mầm non Hồng Phúc <noreply@mamnonhongphuc.id.vn>",
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Send email error:", error);
    throw error;
  }

  return data;
}