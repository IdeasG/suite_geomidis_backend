import { sequelize } from "../../config/postgres/sequelize.js";
import { Op } from "sequelize";
import Auditoria from "../../models/auditoria/auditoria.js";

export class RegistrosService {
  async getDatosAuditoria(offset,pageSize,feini,fefin) {
    try {
      const [rows, metadata] = await sequelize.query(`
      SELECT 
          pa.*,
          COALESCE(tgu.usuario, tseg.c_usuario) AS usuario,
          CASE
              WHEN srol.c_nombre_rol IS NULL THEN 'Adminitrador Geoportal'
              ELSE srol.c_nombre_rol
          END AS c_nombre_rol
      FROM 
          public.auditoria pa
      LEFT JOIN 
          public.tg_usuario tgu ON pa.id_usuario = tgu.id_usuario AND pa.id_rol <> 0
      LEFT JOIN 
          seguridad.tseg_usuarios tseg ON pa.id_usuario = tseg.id_usuario AND pa.id_rol = 0
      LEFT JOIN 
          seguridad.tseg_roles srol ON pa.id_rol = srol.id_rol
      WHERE 
          pa.id_usuario IS NOT NULL 
          AND pa.id_rol IS NOT NULL
          AND fecha between '`+feini+`' and '`+fefin+`'
          order by id_auditoria desc 
          offset `+offset+
      ` limit `+pageSize)
      const [count, metadata2] = await sequelize.query(`
      SELECT 
          count(*) as count
      FROM 
          public.auditoria pa
      LEFT JOIN 
          public.tg_usuario tgu ON pa.id_usuario = tgu.id_usuario AND pa.id_rol <> 0
      LEFT JOIN 
          seguridad.tseg_usuarios tseg ON pa.id_usuario = tseg.id_usuario AND pa.id_rol = 0
      LEFT JOIN 
          seguridad.tseg_roles srol ON pa.id_rol = srol.id_rol
      WHERE 
          pa.id_usuario IS NOT NULL 
          AND pa.id_rol IS NOT NULL
          AND fecha between '`+feini+`' and '`+fefin+`'`)
      const response = {
        rows,
        count: count[0].count
      }
      return response;
    } catch (error) {
      throw new Error("Error...." + error);
    }
  }
}
