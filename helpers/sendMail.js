import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { welcomeTemplate } from "../libs/templates/welcome.js";
import "dotenv/config";

export async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  console.log(SMTP_EMAIL, SMTP_PASSWORD);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileWelcomeTemplate(name) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    mensaje: name,
  });
  return htmlBody;
}
