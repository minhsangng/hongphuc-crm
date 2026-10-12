import { Resend } from "resend";
import { ENV } from "./config/env.js";

const resend = new Resend(ENV.RESEND_API_KEY);


async function sendEmail(prefix = "support", to, subject, html) {
  const FROM = "Mầm non Hồng Phúc <" + prefix + "@mamnonhongphuc.id.vn>";
  const { data, error } = await resend.emails.send({ from: FROM, to, subject, html });
  
  if (error) {
    console.error("Send email error:", error.message ?? error);
    throw new Error(error.message ?? "Gửi email thất bại");
  }
  return data;
}

async function getAllMail() {
  const { data, error } = await resend.emails.list();

  if (error) {
    console.error("Get emails error:", error.message ?? error);
    throw new Error(error.message ?? "Lấy danh sách email thất bại");
  }
  return data;
}

const Mailer = { sendEmail, getAllMail };
export default Mailer;