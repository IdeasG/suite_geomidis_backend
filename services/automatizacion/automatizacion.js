import {
    compileGmailDiarioRegistro,
    sendMail,
  } from "../../helpers/sendMail.js";


export class AutomatizacionService {
async gmailRegistroDiario(fecha,nombres) {
    try {
        await sendMail({       
          to: "info.redinforma@midis.gob.pe",
          name: "GEOMIDIS",
          subject: `Registro diario terminado de capas de programas ${fecha}`,
          body: compileGmailDiarioRegistro(
            'Registro diario de capas',
            `
              Estimado administrador,
              
              Se termino el registro diario de las siguientes capas:
            `,
            nombres,
            `
              Ingrese al módulo de validación de datos para verificar errores.
            `
          ),
        });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async gmailRegistroAnual(fecha,nombres) {
    try {
        await sendMail({
        //   to: "info.redinforma@midis.gob.pe",          
          to: "info.redinforma@midis.gob.pe",
          name: "GEOMIDIS",
          subject: `Registro anual terminado de capas de programas ${fecha}`,
          body: compileGmailDiarioRegistro(
            'Registro anual de capas',
            `
              Estimado administrador,
              
              Se termino el registro anual de las siguientes capas:
            `,
            nombres,
            `
              Ingrese al módulo de validación de datos para verificar errores.
            `
          ),
        });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}