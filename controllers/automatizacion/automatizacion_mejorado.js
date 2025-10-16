import axios from 'axios';
import https from 'https';
import { AutomatizacionService } from '../../services/automatizacion/automatizacion.js';
import { AutomatizacionService as AutomatizacionSequelizeService } from '../../services/automatizacion/automatizacionSequelize.js';

const netBackend = process.env.NET_BACKEND;
const automatizacionService = new AutomatizacionService(); // Servicio original para emails
const automatizacionDbService = new AutomatizacionSequelizeService(); // Nuevo servicio con Sequelize

/**
 * Función principal que verifica y ejecuta servicios según su programación
 * Se ejecuta diariamente y verifica qué servicios necesitan actualización
 */
export const checkAndExecuteServices = async () => {
    const debugInfo = {
        timestamp: new Date().toISOString(),
        proceso: 'verificacion_servicios_programados',
        etapas: []
    };
    
    try {
        console.log('=== Iniciando verificación de servicios programados ===');
        
        // Etapa 1: Obtener servicios
        debugInfo.etapas.push({
            etapa: 1,
            descripcion: 'Consultando servicios pendientes en BD',
            timestamp: new Date().toISOString()
        });
        
        const response = await automatizacionDbService.getServiciosParaEjecutar();
        const serviciosParaEjecutar = response.data;

        // console.log(response);
        // return response;
        // Debug adicional: obtener TODOS los servicios para comparar
        const todosLosServicios = await automatizacionDbService.buscarServicios({});
        
        debugInfo.etapas.push({
            etapa: 2,
            descripcion: 'Servicios obtenidos de BD',
            servicios_pendientes: serviciosParaEjecutar.length,
            servicios_totales: todosLosServicios.data.length,
            timestamp: new Date().toISOString()
        });

        console.log('🔍 Response de BD:', response);
        console.log('📅 Fecha/Hora actual:', new Date().toISOString());

        if (serviciosParaEjecutar.length === 0) {
            console.log('No hay servicios pendientes de ejecución.');
            debugInfo.resultado = 'sin_servicios_pendientes';
            debugInfo.servicios_analizados = todosLosServicios.data.map(s => ({
                id: s.id,
                programa: s.programa,
                capa: s.capa,
                fecha_proxima: s.fecha_proxima_actualizacion,
                activo: s.activo,
                necesita_ejecucion: s.fecha_proxima_actualizacion === null || new Date(s.fecha_proxima_actualizacion) <= new Date()
            }));
            return debugInfo;
        }

        console.log(`Encontrados ${serviciosParaEjecutar.length} servicios para ejecutar:`);
        
        debugInfo.etapas.push({
            etapa: 3,
            descripcion: 'Servicios identificados para ejecución',
            cantidad: serviciosParaEjecutar.length,
            servicios: serviciosParaEjecutar.map(s => ({
                id: s.id,
                programa: s.programa,
                capa: s.capa,
                tipo_frecuencia: s.tipo_frecuencia,
                fecha_ultima_actualizacion: s.fecha_ultima_actualizacion,
                fecha_proxima_actualizacion: s.fecha_proxima_actualizacion
            })),
            timestamp: new Date().toISOString()
        });

        serviciosParaEjecutar.forEach(servicio => {
            console.log(`- ${servicio.programa} > ${servicio.capa} (Frecuencia: ${servicio.tipo_frecuencia}, Última: ${servicio.fecha_ultima_actualizacion})`);
        });

        const resultados = [];
        
        // Ejecutar cada servicio
        debugInfo.etapas.push({
            etapa: 4,
            descripcion: 'Iniciando ejecución de servicios',
            timestamp: new Date().toISOString()
        });
        
        for (const servicio of serviciosParaEjecutar) {
            const resultado = await ejecutarServicio(servicio);
            resultados.push(resultado);
        }
        
        debugInfo.etapas.push({
            etapa: 5,
            descripcion: 'Ejecución completada',
            resultados_exitosos: resultados.filter(r => r.exitoso).length,
            resultados_con_error: resultados.filter(r => !r.exitoso).length,
            timestamp: new Date().toISOString()
        });

        // Enviar reporte por email (TEMPORALMENTE DESHABILITADO PARA PRUEBAS)
        // await automatizacionService.enviarReporteDiario(resultados);
        console.log('📧 Reporte por email omitido durante pruebas');
        
        console.log('=== Verificación de servicios completada ===');
        
        debugInfo.resultado = 'completado';
        debugInfo.resumen_ejecuciones = resultados.map(r => ({
            servicio: `${r.servicio.programa} - ${r.servicio.capa}`,
            exitoso: r.exitoso,
            mensaje: r.mensaje,
            duracion: r.duracion,
            url: r.url
        }));
        
        return debugInfo;
    } catch (error) {
        console.error('Error en verificación de servicios:', error);
        
        debugInfo.resultado = 'error';
        debugInfo.error = {
            mensaje: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        };
        
        // Enviar notificación de error (TEMPORALMENTE DESHABILITADO PARA PRUEBAS)
        try {
            // await automatizacionService.enviarNotificacionError(error);
            console.log('📧 Notificación de error por email omitida durante pruebas');
        } catch (emailError) {
            debugInfo.error.email_error = emailError.message;
        }
        
        return debugInfo;
    }
};

/**
 * Ejecuta un servicio específico y actualiza su registro en BD
 */
const ejecutarServicio = async (servicio) => {
    const inicioEjecucion = new Date();
    
    try {
        console.log(`\n🔄 Ejecutando: ${servicio.programa} - ${servicio.capa}`);
        
        // Calcular fechas
        const fechas = calcularFechasServicio(servicio);
        const fullUrl = `${netBackend}${servicio.url}?feini=${fechas.feIni}&fefin=${fechas.feFin}`;
        
        console.log(`📅 Período: ${fechas.feIni} - ${fechas.feFin}`);
        console.log(`🌐 URL: ${fullUrl}`);
        
        // Realizar llamada al servicio
        const response = await axios.post(fullUrl, {}, {
            timeout: 300000, // 5 minutos de timeout
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        
        const finEjecucion = new Date();
        const duracion = finEjecucion - inicioEjecucion;
        
        // Determinar si fue exitoso
        const exitoso = !response.data.error;
        const mensaje = response.data.message || (exitoso ? 'Ejecución exitosa' : 'Error en el servicio');
        
        // Actualizar registro en BD usando Sequelize
        await automatizacionDbService.actualizarEjecucionServicio(
            servicio.id,
            exitoso,
            mensaje,
            duracion
        );
        
        console.log(`✅ Completado en ${duracion}ms: ${mensaje}`);
        
        return {
            servicio,
            exitoso,
            mensaje,
            duracion,
            url: fullUrl,
            respuesta: response.data
        };
        
    } catch (error) {
        const finEjecucion = new Date();
        const duracion = finEjecucion - inicioEjecucion;
        
        console.error(`❌ Error ejecutando ${servicio.programa} - ${servicio.capa}:`, error.message);
        
        // Registrar error en BD usando Sequelize
        await automatizacionDbService.actualizarEjecucionServicio(
            servicio.id,
            false,
            `Error: ${error.message}`,
            duracion
        );
        
        return {
            servicio,
            exitoso: false,
            mensaje: `Error: ${error.message}`,
            duracion,
            url: `${netBackend}${servicio.url}`,
            error
        };
    }
};

/**
 * Calcula las fechas de inicio y fin según el tipo de servicio
 */
const calcularFechasServicio = (servicio) => {
    const hoy = new Date();
    let fechaInicio;
    
    if (servicio.fecha_ultima_actualizacion) {
        // Si ya se ejecutó antes, tomar desde la última fecha
        fechaInicio = new Date(servicio.fecha_ultima_actualizacion);
    } else {
        // Si es la primera vez, calcular según la frecuencia
        switch (servicio.tipo_frecuencia) {
            case 'D': // Diario
                fechaInicio = new Date(hoy);
                fechaInicio.setDate(fechaInicio.getDate() - 1);
                break;
            case 'M': // Mensual
                fechaInicio = new Date(hoy);
                fechaInicio.setMonth(fechaInicio.getMonth() - 1);
                break;
            case 'A': // Anual
                fechaInicio = new Date(hoy);
                fechaInicio.setFullYear(fechaInicio.getFullYear() - 1);
                break;
            default:
                fechaInicio = new Date(hoy);
                fechaInicio.setDate(fechaInicio.getDate() - 1);
        }
    }
    
    const feIni = formatearFecha(fechaInicio);
    const feFin = formatearFecha(hoy);
    
    return { feIni, feFin };
};

/**
 * Formatea fecha al formato requerido: YYYY/MM/DD
 */
const formatearFecha = (fecha) => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${año}/${mes}/${dia}`;
};

/**
 * Funciones de compatibilidad hacia atrás (DEPRECATED)
 * Mantener por si hay referencias en otros lugares
 */
export const callServicesDaily = async () => {
    console.warn('⚠️ callServicesDaily está DEPRECATED. Usar checkAndExecuteServices()');
    await checkAndExecuteServices();
};

export const callServicesAnual = async () => {
    console.warn('⚠️ callServicesAnual está DEPRECATED. Usar checkAndExecuteServices()');
    await checkAndExecuteServices();
};
/**
 * Función para ejecutar un servicio específico manualmente
 */
export const ejecutarServicioManual = async (programa, capa) => {
    try {
        const response = await automatizacionDbService.getServicioPorProgramaCapa(programa, capa);
        const servicio = response.data;
        
        if (!servicio) {
            throw new Error(`Servicio no encontrado: ${programa} - ${capa}`);
        }
        
        const resultado = await ejecutarServicio(servicio);
        return resultado;
        
    } catch (error) {
        console.error('Error en ejecución manual:', error);
        throw error;
    }
};

/**
 * Función para obtener el estado de todos los servicios
 */
export const getEstadoServicios = async () => {
    try {
        const response = await automatizacionDbService.getEstadoServicios();
        return response.data;
    } catch (error) {
        console.error('Error obteniendo estado de servicios:', error);
        throw error;
    }
};