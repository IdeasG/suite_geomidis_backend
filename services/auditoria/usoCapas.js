import UsoCapas from "../../models/auditoria/usoCapas.js";

export class UsoCapasService {
  async registrarUso(data) {
    try {
      return await UsoCapas.create(data);
    } catch (error) {
      console.error("Error al registrar uso de capas:", error);
      throw new Error("Error al registrar uso de capas");
    }
  }
  async listarUsos(offset = 0, limit = 10) {
    return await UsoCapas.findAll({ offset, limit, order: [["fecha", "desc"]] });
  }
  async agrupadoPorTipoUsuarioFiltrado(c_tipo_usuario, id_geovisor, offset = 0, limit = 10) {
      // Consulta principal con paginación
      const [results] = await UsoCapas.sequelize.query(`
        SELECT
          c.c_nombre_public_capa as nombre_capa,
          c.c_tipo,
          u.c_tipo_usuario as tipo_usuario,
          SUM(CASE WHEN u.accion = 'visible' THEN 1 ELSE 0 END) AS vistas,
          SUM(CASE WHEN u.accion = 'descarga' THEN 1 ELSE 0 END) AS descargas
        FROM auditoria.uso_capas u
        LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
        WHERE u.c_tipo_usuario = :c_tipo_usuario AND u.id_geovisor = :id_geovisor
        GROUP BY c.c_nombre_public_capa, c.c_tipo, u.c_tipo_usuario
        ORDER BY vistas DESC, descargas DESC
        LIMIT :limit OFFSET :offset
      `, { replacements: { c_tipo_usuario, id_geovisor, limit, offset } });

      // Consulta para contar el total
      const [totalResults] = await UsoCapas.sequelize.query(`
        SELECT COUNT(*) as total FROM (
          SELECT
            c.c_nombre_public_capa as nombre_capa
          FROM auditoria.uso_capas u
          LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
          WHERE u.c_tipo_usuario = :c_tipo_usuario AND u.id_geovisor = :id_geovisor
          GROUP BY c.c_nombre_public_capa, c.c_tipo, u.c_tipo_usuario
        ) as subquery
      `, { replacements: { c_tipo_usuario, id_geovisor } });

      return {
        data: results,
        pagination: {
          total: totalResults[0].total,
          page: Math.floor(offset / limit) + 1,
          pageSize: limit,
          totalPages: Math.ceil(totalResults[0].total / limit)
        }
      };
  }

  async agrupadoPorRol(id_rol, id_geovisor, offset = 0, limit = 10) {
    // Consulta principal con paginación
    const [results] = await UsoCapas.sequelize.query(`
      SELECT
        c.c_nombre_public_capa as nombre_capa,
        c.c_tipo,
        SUM(CASE WHEN u.accion = 'visible' THEN 1 ELSE 0 END) AS vistas,
        SUM(CASE WHEN u.accion = 'descarga' THEN 1 ELSE 0 END) AS descargas
      FROM auditoria.uso_capas u
      LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
      WHERE u.id_rol = :id_rol AND u.id_geovisor = :id_geovisor
      GROUP BY c.c_nombre_public_capa, c.c_tipo
      ORDER BY vistas DESC, descargas DESC
      LIMIT :limit OFFSET :offset
    `, { replacements: { id_rol, id_geovisor, limit, offset } });

    // Consulta para contar el total
    const [totalResults] = await UsoCapas.sequelize.query(`
      SELECT COUNT(*) as total FROM (
        SELECT
          c.c_nombre_public_capa as nombre_capa
        FROM auditoria.uso_capas u
        LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
        WHERE u.id_rol = :id_rol AND u.id_geovisor = :id_geovisor
        GROUP BY c.c_nombre_public_capa, c.c_tipo
      ) as subquery
    `, { replacements: { id_rol, id_geovisor } });

    return {
      data: results,
      pagination: {
        total: totalResults[0].total,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(totalResults[0].total / limit)
      }
    };
  }

  async agrupadoPorUsuario(id_usuario, id_geovisor, offset = 0, limit = 10) {
    // Consulta principal con paginación
    const [results] = await UsoCapas.sequelize.query(`
      SELECT
        c.c_nombre_public_capa as nombre_capa,
        c.c_tipo,
        SUM(CASE WHEN u.accion = 'visible' THEN 1 ELSE 0 END) AS vistas,
        SUM(CASE WHEN u.accion = 'descarga' THEN 1 ELSE 0 END) AS descargas
      FROM auditoria.uso_capas u
      LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
      WHERE u.id_usuario = :id_usuario AND u.id_geovisor = :id_geovisor
      GROUP BY c.c_nombre_public_capa, c.c_tipo
      ORDER BY vistas DESC, descargas DESC
      LIMIT :limit OFFSET :offset
    `, { replacements: { id_usuario, id_geovisor, limit, offset } });

    // Consulta para contar el total
    const [totalResults] = await UsoCapas.sequelize.query(`
      SELECT COUNT(*) as total FROM (
        SELECT
          c.c_nombre_public_capa as nombre_capa
        FROM auditoria.uso_capas u
        LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
        WHERE u.id_usuario = :id_usuario AND u.id_geovisor = :id_geovisor
        GROUP BY c.c_nombre_public_capa, c.c_tipo
      ) as subquery
    `, { replacements: { id_usuario, id_geovisor } });

    return {
      data: results,
      pagination: {
        total: totalResults[0].total,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(totalResults[0].total / limit)
      }
    };
  }

  async agrupadoPorFecha(feini, fefin, id_geovisor, offset = 0, limit = 10) {
    // Consulta principal con paginación
    const [results] = await UsoCapas.sequelize.query(`
      SELECT
        c.c_nombre_public_capa as nombre_capa,
        c.c_tipo,
        SUM(CASE WHEN u.accion = 'visible' THEN 1 ELSE 0 END) AS vistas,
        SUM(CASE WHEN u.accion = 'descarga' THEN 1 ELSE 0 END) AS descargas
      FROM auditoria.uso_capas u
      LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
      WHERE u.fecha BETWEEN :feini AND :fefin AND u.id_geovisor = :id_geovisor
      GROUP BY c.c_nombre_public_capa, c.c_tipo
      ORDER BY vistas DESC, descargas DESC
      LIMIT :limit OFFSET :offset
    `, { replacements: { feini, fefin, id_geovisor, limit, offset } });

    // Consulta para contar el total
    const [totalResults] = await UsoCapas.sequelize.query(`
      SELECT COUNT(*) as total FROM (
        SELECT
          c.c_nombre_public_capa as nombre_capa
        FROM auditoria.uso_capas u
        LEFT JOIN administracion.tadm_capas c ON u.id_capa = c.id_capa
        WHERE u.fecha BETWEEN :feini AND :fefin AND u.id_geovisor = :id_geovisor
        GROUP BY c.c_nombre_public_capa, c.c_tipo
      ) as subquery
    `, { replacements: { feini, fefin, id_geovisor } });

    return {
      data: results,
      pagination: {
        total: totalResults[0].total,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(totalResults[0].total / limit)
      }
    };
  }
}
