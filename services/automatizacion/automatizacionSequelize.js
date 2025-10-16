import { Op } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
import AutomatizacionServicios from "../../models/automatizacion/automatizacionServicios.js";

export class AutomatizacionService {
  
  /**
   * Obtiene servicios que necesitan ser ejecutados
   * Siguiendo el patrón de ServiciosService
   */
  async getServiciosParaEjecutar() {
    try {
      const results = await AutomatizacionServicios.findAll({
        where: {
          [Op.and]: [
            { activo: true },
            {
              [Op.or]: [
                { fecha_proxima_actualizacion: null },
                { fecha_proxima_actualizacion: { [Op.lte]: new Date() } }
              ]
            }
          ]
        },
        order: [['programa', 'ASC'], ['capa', 'ASC']]
      });

      return {
        status: "success",
        data: results,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener servicios para ejecutar: " + error);
    }
  }

  /**
   * Obtiene un servicio específico por programa y capa
   */
  async getServicioPorProgramaCapa(programa, capa) {
    try {
      const result = await AutomatizacionServicios.findOne({
        where: {
          programa: programa,
          capa: capa,
          activo: true
        }
      });

      return {
        status: "success",
        data: result,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al buscar servicio: " + error);
    }
  }

  /**
   * Actualiza el registro de ejecución de un servicio
   */
  async actualizarEjecucionServicio(servicioId, exitoso, mensaje, duracionMs) {
    try {
      // Buscar el servicio para obtener la frecuencia
      const servicio = await AutomatizacionServicios.findByPk(servicioId);
      if (!servicio) {
        throw new Error(`Servicio con ID ${servicioId} no encontrado`);
      }

      // Calcular próxima ejecución
      const ahora = new Date();
      const proximaEjecucion = new Date(ahora);
      proximaEjecucion.setDate(proximaEjecucion.getDate() + servicio.dias_frecuencia);

      // Actualizar usando Sequelize
      await AutomatizacionServicios.update({
        fecha_ultima_actualizacion: ahora,
        fecha_proxima_actualizacion: proximaEjecucion,
        fecha_modificacion: ahora
      }, {
        where: { id: servicioId }
      });

      // Opcional: Registrar log en tabla separada
      await this.registrarLogEjecucion(servicioId, exitoso, mensaje, duracionMs);

      return {
        status: "success",
        message: `Servicio ID ${servicioId} actualizado. Próxima ejecución: ${proximaEjecucion.toISOString()}`,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error actualizando ejecución de servicio: " + error);
    }
  }

  /**
   * Obtiene el estado general de todos los servicios
   */
  async getEstadoServicios() {
    try {
      const results = await sequelize.query(`
        SELECT 
          s.*,
          CASE 
            WHEN s.fecha_proxima_actualizacion IS NULL THEN 'Pendiente primera ejecución'
            WHEN s.fecha_proxima_actualizacion <= NOW() THEN 'Requiere ejecución'
            ELSE 'Actualizado'
          END as estado,
          EXTRACT(DAY FROM (s.fecha_proxima_actualizacion - NOW())) as dias_hasta_proxima
        FROM automatizacion_servicios s
        WHERE s.activo = true
        ORDER BY s.programa, s.capa
      `, {
        type: sequelize.QueryTypes.SELECT
      });

      return {
        status: "success",
        data: results,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error obteniendo estado de servicios: " + error);
    }
  }

  /**
   * Agrega un nuevo servicio
   */
  async agregarServicio(datosServicio) {
    try {
      const nuevoServicio = await AutomatizacionServicios.create({
        programa: datosServicio.programa,
        capa: datosServicio.capa,
        url: datosServicio.url,
        tipo_frecuencia: datosServicio.tipo_frecuencia,
        dias_frecuencia: datosServicio.dias_frecuencia,
        descripcion: datosServicio.descripcion,
        activo: datosServicio.activo !== undefined ? datosServicio.activo : true
      });

      return {
        status: "success",
        data: nuevoServicio,
        message: `Nuevo servicio agregado con ID ${nuevoServicio.id}`,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error agregando servicio: " + error);
    }
  }

  /**
   * Actualiza configuración de un servicio
   */
  async actualizarConfiguracionServicio(id, configuracion) {
    try {
      const [filasActualizadas] = await AutomatizacionServicios.update({
        tipo_frecuencia: configuracion.tipo_frecuencia,
        dias_frecuencia: configuracion.dias_frecuencia,
        url: configuracion.url,
        descripcion: configuracion.descripcion,
        activo: configuracion.activo,
        fecha_modificacion: new Date()
      }, {
        where: { id: id }
      });

      if (filasActualizadas === 0) {
        throw new Error(`Servicio con ID ${id} no encontrado`);
      }

      return {
        status: "success",
        message: `Configuración del servicio ID ${id} actualizada`,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error actualizando configuración: " + error);
    }
  }

  /**
   * Registra log de ejecución (opcional)
   */
  async registrarLogEjecucion(servicioId, exitoso, mensaje, duracionMs) {
    try {
      // Esto sería en una tabla de logs separada si la tienes
      // Por ahora solo log en consola
      console.log(`📊 Log: Servicio ${servicioId} - ${exitoso ? 'ÉXITO' : 'ERROR'} - ${mensaje} - ${duracionMs}ms`);
      
      return {
        status: "success",
        message: "Log registrado correctamente",
      };
    } catch (error) {
      console.log("Error registrando log:", error.message);
      // No relanzamos el error para no afectar el flujo principal
    }
  }

  /**
   * Buscar servicios con filtros (siguiendo patrón de búsqueda)
   */
  async buscarServicios(filtros) {
    try {
      const whereClause = { activo: true };
      
      if (filtros.programa) {
        whereClause.programa = { [Op.iLike]: `%${filtros.programa}%` };
      }
      
      if (filtros.capa) {
        whereClause.capa = { [Op.iLike]: `%${filtros.capa}%` };
      }
      
      if (filtros.tipo_frecuencia) {
        whereClause.tipo_frecuencia = filtros.tipo_frecuencia;
      }

      const results = await AutomatizacionServicios.findAll({
        where: whereClause,
        order: [['programa', 'ASC'], ['capa', 'ASC']],
        limit: filtros.limit || 50
      });

      return {
        status: "success",
        data: results,
      };
    } catch (error) {
      console.log(error.message);
      throw new Error("Error buscando servicios: " + error);
    }
  }
}