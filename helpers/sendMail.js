import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { welcomeTemplate } from "../libs/templates/welcome.js";
import "dotenv/config";
import { aceptarTemplate } from "../libs/templates/aceptar.js";
import { rechazaTemplate } from "../libs/templates/rechazar.js";
import { reseteoTemplate } from "../libs/templates/reseteo.js";
import { nuevoUsuarioTemplate } from "../libs/templates/usuario.js";
import { gmailDiarioTemplate } from "../libs/templates/gmailDiario.js";

export async function sendMail({ to, name, subject, body }) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  console.log(SMTP_EMAIL, SMTP_PASSWORD);
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Prueba también con 587 si 465 falla
    secure: true, // true para 465, false para 587 con STARTTLS
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD, // Usa una contraseña de aplicaciones en lugar de la normal
    },
  });

  transport.verify((error, success) => {
    if (error) {
        console.error("Error de conexión SMTP:", error);
    } else {
        console.log("Servidor SMTP listo para enviar correos");
    }
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
