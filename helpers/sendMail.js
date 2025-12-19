import { notificacionRegistroManualTemplate } from "../libs/templates/notificacionRegistroManual.js";
import { notificacionRecuperarPasswordTemplate } from "../libs/templates/notificacionRecuperarPassword.js";
import { notificacionUsuarioAprobadoTemplate } from "../libs/templates/notificacionUsuarioAprobado.js";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { welcomeTemplate } from "../libs/templates/welcome.js";
import "dotenv/config";
import { aceptarTemplate } from "../libs/templates/aceptar.js";
import { rechazaTemplate } from "../libs/templates/rechazar.js";
import { reseteoTemplate } from "../libs/templates/reseteo.js";
import { nuevoUsuarioTemplate } from "../libs/templates/usuario.js";
import { gmailDiarioTemplate } from "../libs/templates/gmailDiario.js";
import { notificacionSolicitudAdminTemplate } from "../libs/templates/notificacionSolicitudAdmin.js";

export function compileNotificacionRegistroManualTemplate(nombre, usuario, contrasena, rol) {
  const template = handlebars.compile(notificacionRegistroManualTemplate);
  const baseUrl = process.env.URL_PUBLIC_FRONT || "https://geoportal.midis.gob.pe";
  const htmlBody = template({
    nombre,
    usuario,
    contrasena,
    rol,
    baseUrl
  });
  return htmlBody;
}

export function compileNotificacionRecuperarPasswordTemplate({ nombre, enlace_recuperacion, baseUrl }) {
  const template = handlebars.compile(notificacionRecuperarPasswordTemplate);
  return template({ nombre, enlace_recuperacion, baseUrl });
}

export function compileNotificacionSolicitudAdminTemplate(nombres, apellidos, correo, institucion, cargo) {
  const template = handlebars.compile(notificacionSolicitudAdminTemplate);
  const baseUrl = process.env.URL_PUBLIC_FRONT || "https://geoportal.midis.gob.pe";
  const htmlBody = template({
    nombres,
    apellidos,
    correo,
    institucion,
    cargo,
    baseUrl
  });
  return htmlBody;
}

export function compileNotificacionUsuarioAprobadoTemplate(nombre, usuario) {
  const template = handlebars.compile(notificacionUsuarioAprobadoTemplate);
  const baseUrl = process.env.URL_PUBLIC_FRONT || "https://geoportal.midis.gob.pe";
  const htmlBody = template({
    nombre,
    usuario,
    baseUrl
  });
  return htmlBody;
}

export async function sendMail({ to, name, subject, body }) {
  const {
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_AUTH,
    SMTP_FROM,
  } = process.env;

  const host = SMTP_HOST || "smtp.gmail.com";
  const port = SMTP_PORT ? parseInt(SMTP_PORT, 10) : 465;
  const secure = typeof SMTP_SECURE !== "undefined" ? SMTP_SECURE === "true" : port === 465;

  const transportOptions = { host, port, secure };

  // If explicit auth is disabled (SMTP_AUTH='false') or no password provided, do not include auth
  const shouldAuth = SMTP_AUTH !== "false" && SMTP_PASSWORD;
  if (shouldAuth) {
    transportOptions.auth = { user: SMTP_EMAIL, pass: SMTP_PASSWORD };
  }

  const transport = nodemailer.createTransport(transportOptions);

  // Verify but do not abort on verify errors — some relays allow send without auth (IP white-listed)
  transport.verify((error, success) => {
    if (error) {
      console.warn("SMTP verify warning:", error);
    } else {
      console.log("Servidor SMTP listo para enviar correos");
    }
  });

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_FROM || SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("sendMail result:", sendResult);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

export function compileWelcomeTemplate(name) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    mensaje: name,
  });
  return htmlBody;
}

export function compileNuevoUsuarioTemplate(mensaje,nombres,cargo,email,tipoDocumento,numeroDocumento,telefono,mensajeDos) {
  const template = handlebars.compile(nuevoUsuarioTemplate);
  const htmlBody = template({
    mensaje: mensaje,
    nombres: nombres,
    cargo: cargo,
    email: email,
    tipoDocumento: tipoDocumento,
    numeroDocumento: numeroDocumento,
    telefono: telefono,
    mensajeDos: mensajeDos
  });
  return htmlBody;
}

export function compileGmailDiarioRegistro(titulo,mensaje,nombres,mensajeDos) {
  const template = handlebars.compile(gmailDiarioTemplate);
  const htmlBody = template({
    titulo: titulo,
    mensaje: mensaje,
    servicios: nombres,
    mensajeDos: mensajeDos
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
