import { Resend } from "resend";
import { ENV } from "./config/env.js";

const resend = new Resend(ENV.RESEND_API_KEY);


async function sendEmail(prefix = "lienhe", to, cc = ["vanan9756@gmail.com, nmsangtg26@gmail.com"], subject, html) {
  const FROM = "Trường Mầm non Hồng Phúc <" + prefix + "@mamnonhongphuc.id.vn>";
  const { data, error } = await resend.emails.send({ from: FROM, to, cc, subject, html });
  
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