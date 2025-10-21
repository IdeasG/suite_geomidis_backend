import { compileNotificacionRecuperarPasswordTemplate } from "../../helpers/sendMail.js";
import crypto from "crypto";
import { ManagerService } from "../../services/manager/manager.js";
import { sendMail, compileNotificacionSolicitudAdminTemplate } from "../../helpers/sendMail.js";
import path from "path";
import fs from "fs";
import { log } from "console";

const managerService = new ManagerService();

export class ManagerController {
  constructor() {}

  async generateTokenResetPassword(req, res) {
    const { email, fk_geoportal } = req.body;
    try {
      console.log('Email recibido para reseteo:', email);
      console.log('FK Geoportal recibido para reseteo:', fk_geoportal);
      if (!email) {
        return res.status(400).json({ error: "Email requerido" });
      }
      // Buscar usuario por email y geoportal
      const usuario = await managerService.findUsuarioByEmail(email, fk_geoportal);
      // console.log('Usuario encontrado para reseteo:', usuario);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      // Generar token temporal
      const token = crypto.randomBytes(32).toString("hex");
      // Guardar token en BD con expiración (ejemplo: 1 hora)
      await managerService.saveResetPasswordToken({ userId: usuario.id_usuario, token, expires: Date.now() + 3600 * 1000 });
      // Construir enlace de recuperación
      const baseUrl = process.env.BASE_URL || "https://geoportal.midis.gob.pe";
      const enlace_recuperacion = `${baseUrl}/reset-password?token=${token}`;
      // Compilar template
      const htmlBody = compileNotificacionRecuperarPasswordTemplate({
        nombre: usuario.nombres || usuario.nombre || email,
        enlace_recuperacion,
        baseUrl
      });
      // Enviar correo
      await sendMail({
        to: email,
        subject: "Recuperación de contraseña – Geoportal MIDIS",
        body: htmlBody
      });
      res.status(200).json({ message: "Correo de recuperación enviado" });
    } catch (error) {
      console.log('Error en generateTokenResetPassword:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getSistemas(req, res) {
    try {
      const { n_acceso } = req.user;
      if (!n_acceso||n_acceso < 10) {
        return res.status(401).json({ error: "Acceso denegado" });
      }
      const data = await managerService.getSistemas();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActividades(req, res) {
    try {
      const data = await managerService.getActividades();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActividadesFotos(req, res) {
    const {id_actividad} = req.query;
    // const {id_actividad} = req.params;
    try {
      const data = await managerService.getActividadesFotos(id_actividad);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async postActividadesFotos(req,res) {
    const {id_actividad, imagen} = req.body;
    try {
      // Obtener el dato base64 de la imagen desde el cuerpo de la solicitud
      // Separar el prefijo "data:image/jpeg;base64," del dato base64
      const base64Image = imagen.split(";base64,").pop();
      
      // Decodificar el dato base64 en un buffer
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Generar un nombre de archivo único
      const fileName = Date.now() + "gr.jpg";

      // Ruta de la carpeta donde se guardará la imagen
      const folderPath = path.join(process.cwd(), "actividades");

      // Crear la carpeta si no existe
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Guardar la imagen en la carpeta
      fs.writeFileSync(path.join(folderPath, fileName), imageBuffer);
      const data = await managerService.saveActividadesFoto(id_actividad,'/actividades/'+fileName);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al procesar la imagen" });
    }
  }

  async saveModuloSistema(req, res) {
    const { pk_sistema, c_modulo, c_descripcion, url, icono } = req.body;
    try {
      const data = await managerService.saveModuloSistema(
        pk_sistema,
        c_modulo,
        c_descripcion,
        url,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveActividades(req, res) {
    const { c_titulo,c_subtitulo,c_descripcion } = req.body;
    try {
      const data = await managerService.saveActividades(
        c_titulo,c_subtitulo,c_descripcion
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateActividades(req, res) {
    const { id_actividad } = req.params;
    const { c_titulo,c_subtitulo,c_descripcion } = req.body;
    try {
      const data = await managerService.updateActividades(
        c_titulo,c_subtitulo,c_descripcion,id_actividad
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteActividades(req, res) {
    const { id_actividad } = req.params;
    try {
      const data = await managerService.deleteActividades(
        id_actividad
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteActividadesFotos(req, res) {
    const { id_foto } = req.params;
    try {
      const data2 = await managerService.getActividadesFotosIdFoto(id_foto);
  
      if (data2) {
        const imagen = data2.c_ruta_foto.split("/actividades/").pop();
        const folderPath = path.join(process.cwd(), "actividades");
  
        if (imagen) {
          const imagePathGrande = path.join(folderPath, imagen);
          if (fs.existsSync(imagePathGrande)) {
            fs.unlinkSync(imagePathGrande);
          }
        }
      }
  
      // Eliminar el registro de la base de datos
      const data = await managerService.deleteActividadesFotos(id_foto);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }  

  async saveGrupoSistema(req, res) {
    const { pk_modulo, c_nombre, url } = req.body;
    try {
      const data = await managerService.saveGrupoSistema(
        pk_modulo,
        c_nombre,
        url
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveMenuSistema(req, res) {
    const { pk_grupo, c_nombre, icono, url } = req.body;
    try {
      const data = await managerService.saveMenuSistema(
        pk_grupo,
        c_nombre,
        icono,
        url
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //CAPAS
  async saveSuperGrupoSistema(req, res) {
    const { pk_sistema, fk_cliente, c_modulo, c_descripcion, icono } = req.body;
    try {
      const data = await managerService.saveSuperGrupoSistema(
        pk_sistema,
        fk_cliente,
        c_modulo,
        c_descripcion,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveGrupoCapasSistema(req, res) {
    const { pk_sistema, pk_modulo, fk_cliente, c_nombre } = req.body;
    try {
      const data = await managerService.saveGrupoCapasSistema(
        pk_sistema,
        pk_modulo,
        fk_cliente,
        c_nombre
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCapasSistema(req, res) {
    const { pk_sistema, pk_grupo, fk_cliente, c_nombre, c_tabla, icono } =
      req.body;
    try {
      const data = await managerService.saveCapasSistema(
        pk_sistema,
        pk_grupo,
        fk_cliente,
        c_nombre,
        c_tabla,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCapasByRol(req, res) {
    const { fk_rol, fk_capa } = req.body;
    const { id, id_rol } = req.user;
    try {
      const data = await managerService.saveCapasByRol(
        fk_rol,
        fk_capa,
        id,
        id_rol
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveOrdenByRol(req, res) {
    const { fk_rol, j_orden } = req.body;
    try {
      const data = await managerService.saveOrdenByRol(fk_rol, j_orden);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrdenByRol(req, res) {
    const {id_rol} = req.user;
    try {
      // console.log('ID_CAPA Y ROL FINAL:' + id_capa, id_rol_enviar);
      let dbResponse = await managerService.getCapasOrdenByIdRol(id_rol);
      if (!dbResponse) {
        const responseCreate = await managerService.postCapasOrdenByIdRol(
          id_rol
        );
        dbResponse = responseCreate;
      }
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrdenByRolInvitado(req, res) {
    const { id_cliente } = req.params;
    try {
      const id_rol = await  managerService.getRolByIdCliente(id_cliente);
      let dbResponse = await managerService.getCapasOrdenByIdRol(id_rol);
      if (!dbResponse) {
        const responseCreate = await managerService.postCapasOrdenByIdRol(
          id_rol
        );
        dbResponse = responseCreate;
      }
      res.status(200).json({ status: "success", data: dbResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //DELETE
  async deleteModuloSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteModuloSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGrupoSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteGrupoSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMenuSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteMenuSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCapasByRol(req, res) {
    const { id } = req.params;
    const { id: id_usuario, id_rol } = req.user;
    try {
      const data = await managerService.deleteCapasByRol(
        id,
        id_usuario,
        id_rol
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // FIN DELETE

  async getSistemabyId(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getSistemabyId(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCapasById(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getCapasById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  //CLIENTES
  async getClientes(req, res) {
    try {
      const data = await managerService.getClientes();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientesById(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getClientesById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSistemasByClientes(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getSistemasByClientes(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveSistemasByCliente(req, res) {
    const { id_cliente, id } = req.body;
    try {
      const data = await managerService.saveSistemasByCliente(id_cliente, id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveGeoportales(req, res) {
    const {
      nombre,
      color_primary,
      logo_bs,
      descripcion,
      componentsIzquierda,
      componentsDerecha,
      componentsMenu,
      componentsArriba,
      terminos_condiciones
    } = req.body;
    try {
      const { n_acceso } = req.user;
      if (!n_acceso||n_acceso < 10) {
        return res.status(401).json({ error: "Acceso denegado" });
      }

      const data = await managerService.saveGeoportales(
        nombre,
        color_primary,
        logo_bs,
        descripcion,
        componentsIzquierda,
        componentsDerecha,
        componentsMenu,
        componentsArriba,
        terminos_condiciones
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async adminNewUser(req, res) {
    const {
      nombres,
      apellidos,
      institucion,
      cargo,
      email,
      tipoDocumento,
      numeroDocumento,
      telefono
    } = req.body;
    try {
      const data = await managerService.adminNewUser(
        nombres,
        cargo,
        email,
        tipoDocumento,
        numeroDocumento,
        telefono
      );
      // console.log('institucion', institucion);
      // Send notification email to admin
      const htmlBody = compileNotificacionSolicitudAdminTemplate(nombres, apellidos, email, institucion, cargo);
      await sendMail({
        // to: "admin@geoportal.midis.gob.pe", // Change to actual admin email(s)
        to: "crysaor.andexca01@gmail.com",
        name: nombres + " " + apellidos,
        subject: "Nueva solicitud de registro – Geoportal MIDIS",
        body: htmlBody
      });
      res.status(200).json({ message: "Solicitud enviada y correo de notificación enviado al administrador.", data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveSolicitud(req, res) {
    const {
      fk_geoportal,
      nombres,
      apellidos,
      nacionalidad,
      tipoDocumento,
      numeroDocumento,
      email,
      telefono,
      ocupacion,
      institucion,
      cargo,
      motivacion,
      password,
    } = req.body;
    try {
      const data = await managerService.saveSolicitud(
        fk_geoportal,
        nombres,
        apellidos,
        nacionalidad,
        tipoDocumento,
        numeroDocumento,
        email,
        telefono,
        ocupacion,
        institucion,
        cargo,
        motivacion,
        password
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendMessage(req, res) {
    const { token, password } = req.body;
    try {
      if (!token || !password) {
        return res.status(400).json({ error: "Token y nueva contraseña requeridos" });
      }
      const result = await managerService.resetPasswordWithToken(token, password);
      if (result.success) {
        res.status(200).json({ message: "Contraseña actualizada correctamente" });
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async editGeoportales(req, res) {
    const {
      nombre,
      color_primary,
      logo_bs,
      descripcion,
      componentsIzquierda,
      componentsDerecha,
      componentsMenu,
      componentsArriba,
      terminos_condiciones
    } = req.body;
    const { id } = req.params;
    try {
      const { n_acceso } = req.user;
      if (!n_acceso||n_acceso < 10) {
        return res.status(401).json({ error: "Acceso denegado" });
      }
      const data = await managerService.editGeoportales(
        id,
        nombre,
        color_primary,
        logo_bs,
        descripcion,
        componentsIzquierda,
        componentsDerecha,
        componentsMenu,
        componentsArriba,
        terminos_condiciones
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGeoportales(req, res) {
    const { id } = req.params;
    try {
      const { n_acceso } = req.user;
      if (!n_acceso || n_acceso < 10) {
        return res.status(401).json({ error: "Acceso denegado" });
      }
      const data = await managerService.deleteGeoportales(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSistemasByCliente(req, res) {
    const { id_cliente, id } = req.params;
    try {
      const data = await managerService.deleteSistemasByCliente(id_cliente, id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCliente(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteCliente(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCliente(req, res) {
    const {
      nombre,
      color_primary,
      color_secundary,
      color_tercero,
      color_cuarto,
      celular,
      pais,
      ubigeo,
      organizacion,
      direccion,
      referencia,
      correo,
      status,
      cargo,
      logo_bs,
      logo_horizontal_bs,
      portada_bs,
    } = req.body;
    try {
      const data = await managerService.saveCliente(
        nombre,
        color_primary,
        color_secundary,
        color_tercero,
        color_cuarto,
        celular,
        pais,
        ubigeo,
        organizacion,
        direccion,
        referencia,
        correo,
        status,
        cargo,
        logo_bs,
        logo_horizontal_bs,
        portada_bs
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
