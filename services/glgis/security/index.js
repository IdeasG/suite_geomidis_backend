import { generatePasswordHash } from "../../../helpers/comparePassword.js";
import Rol from "../../../models/security/rol.js";
import TgUsuario from "../../../models/security/tgUsuario.js";

export class SecurityService {
  async createUser(
    dni,
    nombres,
    ape_paterno,
    ape_materno,
    email,
    celular,
    tipo_usuario,
    rol_id
  ) {
    try {
      const tipoVia = await TgUsuario.create({
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
      });
      return tipoVia;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }

  async getAll(pageNumber, pageSize) {
    try {
      const roles = await Rol.findAll({
        where: { fk_sistema: 1 },
      });
      const offset = (pageNumber - 1) * pageSize;
      const data = await TgUsuario.findAndCountAll({
        offset,
        limit: pageSize,
      });
      const totalItems = data.count;
      const totalPages = Math.ceil(totalItems / pageSize);
      return {
        items: data.rows,
        currentPage: parseInt(pageNumber),
        totalPages,
        totalItems,
        roles,
      };
    } catch (error) {
      throw new Error("Error al obtener..." + error);
    }
  }
}
