import express from 'express';
import { 
    checkAndExecuteServices, 
    ejecutarServicioManual, 
    getEstadoServicios 
} from '../../controllers/automatizacion/automatizacion_mejorado.js';
import { AutomatizacionService } from '../../services/automatizacion/automatizacionSequelize.js';

const automatizacionService = new AutomatizacionService();

export const createAutomatizacionRouter = () => {
    const router = express.Router();

    // GET: Obtener estado de todos los servicios
    router.get('/servicios/estado', async (req, res) => {
        try {
            const servicios = await getEstadoServicios();
            res.json({
                error: false,
                data: servicios,
                message: 'Estado de servicios obtenido correctamente'
            });
        } catch (error) {
            console.error('Error obteniendo estado:', error);
            res.status(500).json({
                error: true,
                message: 'Error interno del servidor',
                details: error.message
            });
        }
    });

    // POST: Ejecutar verificación manual de todos los servicios
    router.post('/servicios/verificar', async (req, res) => {
        try {
            console.log('🔧 Ejecución manual iniciada por usuario');
            await checkAndExecuteServices();
            res.json({
                error: false,
                message: 'Verificación de servicios ejecutada correctamente'
            });
        } catch (error) {
            console.error('Error en verificación manual:', error);
            res.status(500).json({
                error: true,
                message: 'Error ejecutando verificación',
                details: error.message
            });
        }
    });

    // POST: Ejecutar servicio específico manualmente
    router.post('/servicios/ejecutar/:programa/:capa', async (req, res) => {
        try {
            const { programa, capa } = req.params;
            console.log(`🎯 Ejecución manual específica: ${programa} - ${capa}`);
            
            const resultado = await ejecutarServicioManual(programa, capa);
            
            res.json({
                error: !resultado.exitoso,
                data: resultado,
                message: resultado.mensaje
            });
        } catch (error) {
            console.error('Error en ejecución específica:', error);
            res.status(500).json({
                error: true,
                message: 'Error ejecutando servicio específico',
                details: error.message
            });
        }
    });

    // PUT: Actualizar configuración de un servicio
    router.put('/servicios/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const configuracion = req.body;
            
            await automatizacionService.actualizarConfiguracionServicio(id, configuracion);
            
            res.json({
                error: false,
                message: 'Configuración actualizada correctamente'
            });
        } catch (error) {
            console.error('Error actualizando configuración:', error);
            res.status(500).json({
                error: true,
                message: 'Error actualizando configuración',
                details: error.message
            });
        }
    });

    // POST: Agregar nuevo servicio
    router.post('/servicios', async (req, res) => {
        try {
            const servicio = req.body;
            const response = await automatizacionService.agregarServicio(servicio);
            const nuevoId = response.data.id;
            
            res.json({
                error: false,
                data: { id: nuevoId },
                message: 'Servicio agregado correctamente'
            });
        } catch (error) {
            console.error('Error agregando servicio:', error);
            res.status(500).json({
                error: true,
                message: 'Error agregando servicio',
                details: error.message
            });
        }
    });

    return router;
};