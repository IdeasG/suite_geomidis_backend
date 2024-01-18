import { generarToken, refreshTokenUser } from "../../helpers/auth.js";
import { comparePassword } from "../../helpers/comparePassword.js";
import Authenticate from "../../models/security/authenticate.js";
import IntAuthenticate from "../../models/security/intAuthenticate.js";
import ToolsDetail from "../../models/security/tools.js";
import Rol from "../../models/security/rol.js";
import ToolsAdmin from "../../models/security/toolsAdmin.js";
import { Op } from "sequelize";
import HerramientaRoles from "../../models/security/herramientaSistema.js";
import TiSisClienteD from "../../models/manager/tiSisClienteDetail.js";
import Component from "../../models/security/component.js";
import { sequelize } from "../../config/postgres/sequelize.js";

export class AuthenticateService {
  async signIn(c_usuario, c_contrasena) {
    try {
      let data = await Authenticate.findOne({
        where: { c_usuario },
      });

      let isPasswordCorrect = false;
      let isSuiteUser = false;

      if (!data) {
        data = await IntAuthenticate.findOne({
          where: { usuario: c_usuario },
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
      throw new Error("Error: ", error);
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
      throw new Error("Error: ", error);
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
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getComp(id) {
    try {
      // const roles = await Component.findAll();
      const [izquierda] = await sequelize.query(
        `select cm.*
        from administracion.geoportales_component gc
        inner join administracion.components_map cm on gc.fk_componente=cm.id
        where fk_geoportal=${id} and position=1
        order by gc.orden ASC`
      );

      const [derecha] = await sequelize.query(
        `select cm.*
        from administracion.geoportales_component gc
        inner join administracion.components_map cm on gc.fk_componente=cm.id
        where fk_geoportal=${id} and position=2
        order by gc.orden ASC`
      );

      const [menu] = await sequelize.query(
        `select cm.*
        from administracion.geoportales_component gc
        inner join administracion.components_map cm on gc.fk_componente=cm.id
        where fk_geoportal=${id} and position=3
        order by gc.orden ASC`
      );

      const [arriba] = await sequelize.query(
        `select cm.*
        from administracion.geoportales_component gc
        inner join administracion.components_map cm on gc.fk_componente=cm.id
        where fk_geoportal=${id} and position=4
        order by gc.orden ASC`
      );
      return { izquierda, derecha, menu, arriba };
      // return roles;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
    }
  }

  async getRol() {
    try {
      const roles = await Rol.findAll();
      for (const rol of roles) {
        const tools = await this.getToolsByRol(rol.id);
        rol.dataValues.tools = tools;
      }
      return { roles };
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
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

  async saveRol(fk_sistema, fk_cliente, nombre, descripcion) {
    try {
      const data = await Rol.create({
        fk_sistema,
        fk_cliente,
        nombre,
        descripcion,
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
      const data = await Rol.destroy({
        where: { id: id },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Error al obtener el servicio.");
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
