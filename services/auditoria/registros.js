import { sequelize } from "../../config/postgres/sequelize.js";
import { Op } from "sequelize";
import Auditoria from "../../models/auditoria/auditoria.js";

export class RegistrosService {
  async getDatosAuditoria(offset,pageSize,feini,fefin) {
    try {
      const response = await Auditoria.findAndCountAll({
        where: {
            fecha: {
                [Op.between]: [feini,fefin]
            }
        },
        offset,
        limit: pageSize,
      });
      return response;
    } catch (error) {
      throw new Error("Error...." + error);
    }
  }
}
