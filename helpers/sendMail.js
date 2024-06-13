import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { welcomeTemplate } from "../libs/templates/welcome.js";
import "dotenv/config";
import { aceptarTemplate } from "../libs/templates/aceptar.js";
import { rechazaTemplate } from "../libs/templates/rechazar.js";
import { reseteoTemplate } from "../libs/templates/reseteo.js";
import { nuevoUsuarioTemplate } from "../libs/templates/usuario.js";

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

export function compileNuevoUsuarioTemplate(name) {
  const template = handlebars.compile(nuevoUsuarioTemplate);
  const htmlBody = template({
    mensaje: name,
  });
  return htmlBody;
}

export function compileReseteoTemplate(password) {
  const template = handlebars.compile(reseteoTemplate);
  const htmlBody = template({
    password: password,
  });
  return htmlBody;
}

export function compileRechazaSolicitud(name) {
  const template = handlebars.compile(rechazaTemplate);
  const htmlBody = template({
    mensaje: name,
  });
  return htmlBody;
}

export function compileAceptaSolicitud(mensaje, rol, usuario, password) {
  const template = handlebars.compile(aceptarTemplate);
  const htmlBody = template({
    mensaje: mensaje,
    rol: rol,
    usuario: usuario,
    password: password,
  });
  return htmlBody;
}
