
import { generarToken, refreshTokenUser } from "../../helpers/auth.js";
import {
  comparePassword,
  generatePasswordHash,
} from "../../helpers/comparePassword.js";
import Authenticate from "../../models/security/authenticate.js";
import IntAuthenticate from "../../models/security/intAuthenticate.js";
import ToolsDetail from "../../models/security/tools.js";
import Rol from "../../models/security/rol.js";
import ToolsAdmin from "../../models/security/toolsAdmin.js";
import { Op, Sequelize, literal } from "sequelize";
import HerramientaRoles from "../../models/security/herramientaSistema.js";
import TiSisClienteD from "../../models/manager/tiSisClienteDetail.js";
import { sequelize } from "../../config/postgres/sequelize.js";
import Component from "../../models/security/component.js";
import Geoportal from "../../models/manager/geoportal.js";
import TgUsuario from "../../models/security/tgUsuario.js";
import ComponentByRol from "../../models/security/componentByRol.js";
import Solicitud from "../../models/manager/solicitud.js";
import {
  compileAceptaSolicitud,
  compileRechazaSolicitud,
  compileWelcomeTemplate,
  sendMail,
} from "../../helpers/sendMail.js";
export class AuthenticateService {
  async signIn(c_usuario, c_contrasena, id) {
    try {
      let data = await Authenticate.findOne({
        where: { c_usuario },
      });

      if (data) {
        data.dataValues.rol_id = 0;
      }

      let isPasswordCorrect = false;
      let isSuiteUser = false;

      if (!data) {
        data = await IntAuthenticate.findOne({
          where: { usuario: c_usuario, id_cliente: id },
        });

        if (!data) {
          throw new Error("El usuario no ha sido encontrado.");
        }

        isPasswordCorrect = comparePassword(data.clave, c_contrasena);
      } else {
        isPasswordCorrect = comparePassword(data.c_contrasena, c_contrasena);
        isSuiteUser = true;
      }

      if (!isPasswordCorrect) {
        throw new Error("Contraseña incorrecta.");
      }
      const accessToken = generarToken(data, "1d");
      return { isSuiteUser, backendTokens: accessToken };
    } catch (error) {
      console.error(error);
      throw new Error("Error: " + error);
    }
  }

  async refreshToken(id, id_cliente) {
    try {
      let data = await Authenticate.findOne({
        where: { id_usuario: id },
      });

      let isSuiteUser = false;

      if (!data) {
        data = await IntAuthenticate.findOne({
          where: { id_usuario: id },
        });

        if (!data) {
          throw new Error("El usuario no ha sido encontrado.");
        }
      } else {
        isSuiteUser = true;
      }

      const accessToken = generarToken(data, "1d");
      return { isSuiteUser, backendTokens: accessToken };
    } catch (error) {
      console.error(error);
      throw new Error("Error: " + error);
    }
  }

  async getProfile(id, id_cliente) {
    try {
      const usuario = await IntAuthenticate.findOne({
        where: { id_usuario: id },
      });
      const rol = await Rol.findOne({
        where: { id: usuario.rol_id },
      });
      const sistemas = await TiSisClienteD.findAll({
        where: {
          fk_cliente: id_cliente,
        },
      });
      return { usuario, sistemas, rol };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio, " + error);
    }
  }

  async getTools(id, id_cliente, id_sistema) {
    try {
      const usuario = await IntAuthenticate.findOne({
        where: { id_usuario: id },
        attributes: ["rol_id"],
      });

      console.log(usuario);

      const tools = await ToolsDetail.findAll({
        where: { fk_rol: usuario.dataValues.rol_id },
      });

      const transformedData = [];

      tools.forEach((item) => {
        const existingItem = transformedData.find(
          (transformedItem) => transformedItem.id === item.id
        );
        if (!existingItem) {
          transformedData.push({
            id: item.id,
            c_modulo: item.c_modulo,
            c_descripcion: item.c_descripcion,
            url: item.url,
            icono_modulo: item.icono_modulo,
            estado: item.estado,
            grupos: [
              {
                id_grupo: item.id_grupo,
                pk_modulo: item.pk_modulo,
                c_nombre_grupo: item.c_nombre_grupo,
                url_grupo: item.url_grupo,
                b_grupo: item.b_grupo,
                herramientas: [
                  {
                    id_menu: item.id_menu,
                    pk_grupo: item.pk_grupo,
                    c_nombre_menu: item.c_nombre_menu,
                    icono_menu: item.icono_menu,
                    url_menu: item.url_menu,
                    b_menu: item.b_menu,
                  },
                ],
              },
            ],
          });
        } else {
          const grupo = existingItem.grupos.find(
            (existingGrupo) => existingGrupo.id_grupo === item.id_grupo
          );
          if (!grupo) {
            existingItem.grupos.push({
              id_grupo: item.id_grupo,
              pk_modulo: item.pk_modulo,
              c_nombre_grupo: item.c_nombre_grupo,
              url_grupo: item.url_grupo,
              b_grupo: item.b_grupo,
              herramientas: [
                {
                  id_menu: item.id_menu,
                  pk_grupo: item.pk_grupo,
                  c_nombre_menu: item.c_nombre_menu,
                  icono_menu: item.icono_menu,
                  url_menu: item.url_menu,
                  b_menu: item.b_menu,
                },
              ],
            });
          } else {
            grupo.herramientas.push({
              id_menu: item.id_menu,
              pk_grupo: item.pk_grupo,
              c_nombre_menu: item.c_nombre_menu,
              icono_menu: item.icono_menu,
              url_menu: item.url_menu,
              b_menu: item.b_menu,
            });
          }
        }
      });

      const data = transformedData;
      return data;
    } catch (error) {
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComponentesByGeoportal(id, id_rol, id_cliente, id_geoportal) {
    try {
      const geoportal = await Geoportal.findOne({
        where: {
          id: id_geoportal,
        },
      });
      // console.log(geoportal);
      let data = [];

      const rol = await TgUsuario.findOne({
        where: { id_usuario: id, id_cliente: id_geoportal },
      });

      if (!rol) {
        const [componets] = await sequelize.query(
          `select cm.*, case when position is null then 0 else position end as position
          from administracion.components_map cm
          left join administracion.geoportales_component gc on cm.id=gc.fk_componente and fk_geoportal=${id_geoportal}
        order by gc.orden ASC`
        );
        data = componets;
      } else {
        const rol = await TgUsuario.findOne({
          where: { id_usuario: id, id_cliente: id_geoportal },
        });
        const [componets] = await sequelize.query(
          `select cm.*, case when position is null then 0 else position end as position
          from administracion.components_map cm
          left join administracion.geoportales_component_rol gc on cm.id=gc.fk_componente and fk_geoportal=${id_cliente} and fk_rol=${rol.rol_id}
        order by gc.orden ASC`
        );
        data = componets;
      }

      const izquierda = data.filter((item) => item.position === 1);
      const derecha = data.filter((item) => item.position === 2);
      const menu = data.filter((item) => item.position === 3);
      const arriba = data.filter((item) => item.position === 4);
      const general = data.filter((item) => item.position === 0);

      return { izquierda, derecha, menu, arriba, general, geoportal };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComponentesByGeoportalInvitado(id_geoportal) {
    try {
      const geoportal = await Geoportal.findOne({
        where: {
          id: id_geoportal,
        },
      });

      let data = [];

      const rol = await Rol.findOne({
        where: {
          id_cliente: id_geoportal,
          c_nombre_rol: { [Sequelize.Op.iLike]: "%invitado%" },
        },
        attributes: ["id_rol"],
        limit: 1,
      });

      const [componets] = await sequelize.query(
        `select cm.*, case when position is null then 0 else position end as position
          from administracion.components_map cm
          left join administracion.geoportales_component_rol gc on cm.id=gc.fk_componente and fk_geoportal=${id_geoportal} and fk_rol=${rol.id_rol}
        order by gc.orden ASC`
      );
      data = componets;

      const izquierda = data.filter((item) => item.position === 1);
      const derecha = data.filter((item) => item.position === 2);
      const menu = data.filter((item) => item.position === 3);
      const arriba = data.filter((item) => item.position === 4);
      const general = data.filter((item) => item.position === 0);

      return { izquierda, derecha, menu, arriba, general, geoportal };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComponentesByGeoportalByRol(id_rol, id_cliente) {
    try {
      const geoportal = await Geoportal.findOne({
        where: {
          id: id_cliente,
        },
      });

      let data = [];
      const [componets] = await sequelize.query(
        `select f.id, f.component_name, f.props, f.description, case when gcr.position is null then 0 else gcr.position end as position from (
          select cm.*, position 
          from administracion.components_map cm
          left join administracion.geoportales_component gc on cm.id=gc.fk_componente and fk_geoportal=${id_cliente}
          where position is not null) as f
          left join administracion.geoportales_component_rol gcr on f.id=gcr.fk_componente and gcr.fk_geoportal=${id_cliente} and gcr.fk_rol=${id_rol}
          order by gcr.orden ASC`
      );

      data = componets;
      const izquierda = data.filter((item) => item.position === 1);
      const derecha = data.filter((item) => item.position === 2);
      const menu = data.filter((item) => item.position === 3);
      const arriba = data.filter((item) => item.position === 4);
      const general = data.filter((item) => item.position === 0);

      return { izquierda, derecha, menu, arriba, general, geoportal };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComponentesByGeoportalI(id, id_rol, id_cliente) {
    console.log(id, id_rol, id_cliente);
    try {
      const geoportal = await Geoportal.findOne({
        where: {
          id: id_cliente,
        },
      });

      let data = [];
      if (id_rol == "0") {
        const [componets] = await sequelize.query(
          `select cm.*, case when position is null then 0 else position end as position 
          from administracion.components_map cm
          left join administracion.geoportales_component gc on cm.id=gc.fk_componente and fk_geoportal=${id_cliente}
        order by gc.orden ASC`
        );
        data = componets;
      } else {
        const rol = await TgUsuario.findOne({
          where: { id_usuario: id_usuario },
        });
        const [componets] = await sequelize.query(
          `select cm.*, case when position is null then 0 else position end as position 
          from administracion.components_map cm
          left join administracion.geoportales_component_rol gc on cm.id=gc.fk_componente and fk_geoportal=${id_cliente} and fk_rol=${rol.rol_id}
        order by gc.orden ASC`
        );
        data = componets;
      }

      const izquierda = data.filter((item) => item.position === 1);
      const derecha = data.filter((item) => item.position === 2);
      const menu = data.filter((item) => item.position === 3);
      const arriba = data.filter((item) => item.position === 4);
      const general = data.filter((item) => item.position === 0);

      return { izquierda, derecha, menu, arriba, general, geoportal };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getUsuariosByGeoportal(id) {
    try {
      const data = await Authenticate.findAll({
        where: {
          id_cliente: id,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getUsuariosInternoByGeoportal(id, pageNumber, pageSize) {
    try {
      const roles = await Rol.findAll({
        where: { id_cliente: id },
      });

      const solicitudes = await Solicitud.findAll({
        where: { fk_geoportal: id, estado: false},
      });
      const data = await TgUsuario.findAll({
        where: {
          id_cliente: id,
        },
      });
      return {
        items: data,
        roles,
        solicitudes,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async buscarUsuariosInternosPorNombre(nombre, id_cliente) {
    // Busca por nombres, ape_paterno, ape_materno usando ILIKE y limit 10
    return await IntAuthenticate.findAll({
      params: ["id_usuario", "nombres", "ape_paterno", "ape_materno", "usuario"],
      where: {
        id_cliente,
        [Op.or]: [
          { nombres: { [Op.iLike]: `%${nombre}%` } },
          { ape_paterno: { [Op.iLike]: `%${nombre}%` } },
          { ape_materno: { [Op.iLike]: `%${nombre}%` } },
          { usuario: { [Op.iLike]: `%${nombre}%` } }
        ]
      },
      limit: 10
    });
  }

  async createUsuariosByGeoportal(id, usuario, contrasena) {
    try {
      const data = await Authenticate.create({
        id_cliente: id,
        c_usuario: usuario,
        c_contrasena: generatePasswordHash(contrasena),
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async updateUsuariosInternoByGeoportal(
    id_usuario,
    id_rol,
    nombres,
    ape_paterno,
    ape_materno,
    correo,
    dni,
    celular,
    id_usuario_auditoria,
    id_rol_auditoria
  ) {
    try {
      const usuario = await TgUsuario.update(
        {
          nombres,
          ape_paterno,
          ape_materno,
          correo,
          dni,
          celular,
          rol_id: id_rol,
          id_usuario_auditoria,
          id_rol_auditoria,
        },
        { where: { id_usuario: id_usuario } }
      );
      return usuario;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async updatePasswordUsuariosInternoByGeoportal(id_usuario, password, id_rol) {
    try {
      if (id_rol == 0) {
        await Authenticate.update(
          {
            c_contrasena: generatePasswordHash(password),
          },
          {
            where: { id_usuario },
          }
        );
      } else {
        await TgUsuario.update(
          {
            clave: generatePasswordHash(password),
          },
          { where: { id_usuario } }
        );
      }
      return;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async getNombreRol(id_rol, id_usuario) {
    try {
      let nombreRol = "";
      let nombreUsuario = "";
      if (id_rol == 0) {
        nombreRol = "Adminitrador Geoportal";
        nombreUsuario = "";
      } else {
        const rol = await Rol.findOne({
          where: { id_rol },
          attributes: ["c_nombre_rol"],
        });
        nombreRol = rol ? rol.c_nombre_rol : "";
        const usuario = await TgUsuario.findOne({
          where: { id_usuario },
          attributes: ["nombres", "ape_paterno"],
        });
        nombreUsuario = usuario.nombres + " " + usuario.ape_paterno;
      }
      const valores = {
        nombreRol: nombreRol,
        nombreUsuario: nombreUsuario,
      };
      return valores;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async deleteUsuariosInternoByGeoportal(
    id_usuario,
    id_usuario_auditoria,
    id_rol_auditoria
  ) {
    try {
      await TgUsuario.update(
        {
          id_usuario_auditoria,
          id_rol_auditoria,
        },
        {
          where: { id_usuario: id_usuario },
        }
      );
      const usuario = await TgUsuario.destroy({
        where: { id_usuario: id_usuario },
      });
      return usuario;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async createUsuarioInternosByGeoportal(
    dni,
    nombres,
    ape_paterno,
    ape_materno,
    email,
    celular,
    tipo_usuario,
    rol_id,
    id_cliente,
    id_usuario_auditoria,
    id_rol_auditoria
  ) {
    try {
      const usuario = await TgUsuario.create({
        usuario: dni,
        clave: generatePasswordHash(dni),
        dni,
        nombres,
        ape_paterno,
        ape_materno,
        email,
        celular,
        tipo_usuario,
        rol_id,
        estado: "0",
        id_cliente,
        id_usuario_auditoria,
        id_rol_auditoria,
      });
      return usuario;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async createUsuariosBySolicitud(
    fk_geoportal,
    id_rol,
    isAceptado,
    mensaje,
    password,
    user,
    dni,
    nombres,
    ape_paterno,
    email,
    celular
  ) {
    try {
      if (isAceptado) {
        const rol = await Rol.findOne({
          where: {
            id_rol: id_rol,
          },
        });
        const usuario = await TgUsuario.create({
          usuario: user,
          clave: generatePasswordHash(password),
          dni,
          nombres,
          ape_paterno,
          ape_materno: "",
          email,
          celular,
          tipo_usuario: "",
          rol_id: id_rol,
          estado: "0",
          id_cliente: fk_geoportal,
        });
        if (usuario) {
          await Solicitud.update(
            {
              b_solicitud: true,
              estado: isAceptado,
              d_estado: Sequelize.literal("NOW()"),
            },
            { where: { fk_geoportal: fk_geoportal, numero_documento: dni } }
          );
          await sendMail({
            to: email,
            name: "GEOMIDIS",
            subject: "Solicitud aceptada",
            body: compileAceptaSolicitud(
              mensaje,
              rol.c_nombre_rol,
              user,
              password
            ),
          });
        }
      } else {
        await Solicitud.update(
          {
            b_solicitud: true,
            estado: isAceptado,
            d_estado: Sequelize.literal("NOW()"),
          },
          { where: { fk_geoportal: fk_geoportal, numero_documento: dni } }
        );
        await sendMail({
          to: email,
          name: "GEOMIDIS",
          subject: "Solicitud rechazada",
          body: compileRechazaSolicitud(mensaje),
        });
      }
      return true;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async createComponentByRol(
    id_cliente,
    componentsIzquierda,
    componentsDerecha,
    componentsMenu,
    componentsArriba,
    id_rol
  ) {
    try {
      await ComponentByRol.destroy({
        where: {
          fk_geoportal: id_cliente,
          fk_rol: id_rol,
        },
      });
      if (componentsIzquierda.length > 0) {
        for (let index = 0; index < componentsIzquierda.length; index++) {
          const element = componentsIzquierda[index];
          await ComponentByRol.create({
            fk_geoportal: id_cliente,
            fk_componente: element.id,
            fk_rol: id_rol,
            position: 1,
            orden: index,
          });
        }
      }
      if (componentsDerecha.length > 0) {
        for (let index = 0; index < componentsDerecha.length; index++) {
          const element = componentsDerecha[index];
          await ComponentByRol.create({
            fk_geoportal: id_cliente,
            fk_componente: element.id,
            fk_rol: id_rol,
            position: 2,
            orden: index,
          });
        }
      }
      if (componentsMenu.length > 0) {
        for (let index = 0; index < componentsMenu.length; index++) {
          const element = componentsMenu[index];
          await ComponentByRol.create({
            fk_geoportal: id_cliente,
            fk_componente: element.id,
            fk_rol: id_rol,
            position: 3,
            orden: index,
          });
        }
      }
      if (componentsArriba.length > 0) {
        for (let index = 0; index < componentsArriba.length; index++) {
          const element = componentsArriba[index];
          await ComponentByRol.create({
            fk_geoportal: id_cliente,
            fk_componente: element.id,
            fk_rol: id_rol,
            position: 4,
            orden: index,
          });
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio: " + error);
    }
  }

  async deleteUsuariosByGeoportal(id) {
    try {
      const data = await Authenticate.destroy({
        where: { id_usuario: id },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComp(id) {
    try {
      const roles = await Component.findAll();
      return roles;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getRol(id_cliente) {
    try {
      const roles = await Rol.findAll({
        where: {
          id_cliente: id_cliente,
        },
      });
      return { roles };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getRolPermitirDescarga(id_rol) {
    try {
      const roles = await Rol.findAll({
        attributes: ["b_descargas"],
        where: {
          id_rol,
        },
      });
      return { roles };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async putRolDescarga(id_rol, b_descargas) {
    try {
      const roles = await Rol.update(
        { b_descargas }, // Datos a actualizar
        {
          where: {
            id_rol, // Asegúrate de que la columna en la DB sea `id_rol`
          },
        }
      );
      return { roles };
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el rol.");
    }
  }

  async getToolsByRol(id) {
    try {
      const toolsAdmin = await ToolsAdmin.findAll({
        where: { fk_rol: id },
      });

      const transformedData = [];

      toolsAdmin.forEach((item) => {
        const existingItem = transformedData.find(
          (transformedItem) => transformedItem.id === item.id
        );
        if (!existingItem) {
          transformedData.push({
            id: item.id,
            c_modulo: item.c_modulo,
            c_descripcion: item.c_descripcion,
            url: item.url,
            icono_modulo: item.icono_modulo,
            estado: item.estado,
            grupos: [
              {
                id_grupo: item.id_grupo,
                pk_modulo: item.pk_modulo,
                c_nombre_grupo: item.c_nombre_grupo,
                url_grupo: item.url_grupo,
                b_grupo: item.b_grupo,
                herramientas: [
                  {
                    id_menu: item.id_menu,
                    pk_grupo: item.pk_grupo,
                    c_nombre_menu: item.c_nombre_menu,
                    icono_menu: item.icono_menu,
                    url_menu: item.url_menu,
                    b_menu: item.b_menu,
                    activo: item.activo,
                  },
                ],
              },
            ],
          });
        } else {
          const grupo = existingItem.grupos.find(
            (existingGrupo) => existingGrupo.id_grupo === item.id_grupo
          );
          if (!grupo) {
            existingItem.grupos.push({
              id_grupo: item.id_grupo,
              pk_modulo: item.pk_modulo,
              c_nombre_grupo: item.c_nombre_grupo,
              url_grupo: item.url_grupo,
              b_grupo: item.b_grupo,
              herramientas: [
                {
                  id_menu: item.id_menu,
                  pk_grupo: item.pk_grupo,
                  c_nombre_menu: item.c_nombre_menu,
                  icono_menu: item.icono_menu,
                  url_menu: item.url_menu,
                  b_menu: item.b_menu,
                  activo: item.activo,
                },
              ],
            });
          } else {
            grupo.herramientas.push({
              id_menu: item.id_menu,
              pk_grupo: item.pk_grupo,
              c_nombre_menu: item.c_nombre_menu,
              icono_menu: item.icono_menu,
              url_menu: item.url_menu,
              b_menu: item.b_menu,
              activo: item.activo,
            });
          }
        }
      });

      return transformedData;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async saveRol(nombre, id_cliente) {
    try {
      const data = await Rol.create({
        id_cliente: id_cliente,
        c_nombre_rol: nombre,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async saveRolTools(fk_rol, fk_modulo, fk_grupo, fk_menu) {
    try {
      const data = await HerramientaRoles.create({
        fk_rol,
        fk_modulo,
        fk_grupo,
        fk_menu,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async deleteRol(id) {
    try {
      const data = await TgUsuario.findOne({
        where: { rol_id: id },
      });

      if (data) {
        return false;
      } else {
        await Rol.destroy({
          where: { id_rol: id },
        });
        await ComponentByRol.destroy({
          where: { fk_rol: id },
        });

        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio." + error);
    }
  }

  async deleteRolTools(id_rol, fk_modulo, fk_grupo, fk_menu) {
    try {
      const data = await HerramientaRoles.destroy({
        where: {
          [Op.and]: [
            { fk_rol: id_rol },
            { fk_modulo: fk_modulo },
            { fk_grupo: fk_grupo },
            { fk_menu: fk_menu },
          ],
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }
}
