import axios from 'axios';
import https from 'https';
const netBackend = process.env.NET_BACKEND

const servicios = [
    // { url: netBackend + '/qali_warma/almaprov', program: 'Qali Warma', capa: 'Almacén del Proveedor' },
    // { url: netBackend + '/qali_warma/entrprod', program: 'Qali Warma', capa: 'Entrega de Productos' },
    // { url: netBackend + '/qali_warma/supeiiee', program: 'Qali Warma', capa: 'Supervisión IIEE' },
    // { url: netBackend + '/pension/agebanac', program: 'PENSION 65', capa: 'Agencias del Banco de la Nación' },
    // { url: netBackend + '/pension/emtraval', program: 'PENSION 65', capa: 'Empresa Transportadora de Valores' },
    // { url: netBackend + '/pension/usupen65', program: 'PENSION 65', capa: 'Usuario de PENSIÓN 65' },
    { url: netBackend + '/cuna_mas/sa', program: 'CUNA MAS', capa: 'Local de Servicios Alimentarios' },
    // { url: netBackend + '/cuna_mas/ciai', program: 'CUNA MAS', capa: 'Local del Centro Infantil de Atención Integral' }
];

const serviciosAnuales = [
    { url: netBackend + '/cuna_mas/seuniter', program: 'CUNA MAS', capa: 'Sedes de Unidades Territoriales' },
    { url: netBackend + '/cuna_mas/untecuma', program: 'CUNA MAS', capa: 'Sedes de Unidades Territoriales' },
];

// Función para realizar la llamada a los servicios diariamente
export const callServicesDaily = async () => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1); // Obtener la fecha de ayer
        const feIni = `${yesterday.getFullYear()}/${String(yesterday.getMonth() + 1).padStart(2, '0')}/${String(yesterday.getDate()).padStart(2, '0')}`;
        const feFin = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

        // Itera sobre el array de servicios
        for (const servicio of servicios) {
            const { url, program, capa } = servicio;
            const fullUrl = `${url}?feini=${feIni}&fefin=${feFin}`;

            // Realiza la llamada al servicio
            const response = await axios.post(fullUrl, {
                // Cuerpo de la solicitud si es necesario
            }
            // ,{
            //     // Configuración adicional
            //     httpsAgent: new https.Agent({ rejectUnauthorized: false })
            // }
            );
            console.log(response.data.error);
            // console.log(`Llamada exitosa al servicio ${program}, capa ${capa}:`, response.data);
            console.log(`Llamada exitosa al servicio ${program}, capa ${capa}:`);
            console.log(fullUrl);
            // Busca un registro existente o crea uno nuevo
        }
    } catch (error) {
        console.error('Error al llamar a los servicios:', error);
    }
};

export const callServicesAnual = async () => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1); // Obtener la fecha de ayer
        const feIni = `${yesterday.getFullYear()}/${String(yesterday.getMonth() + 1).padStart(2, '0')}/${String(yesterday.getDate()).padStart(2, '0')}`;
        const feFin = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

        // Itera sobre el array de servicios
        for (const servicio of serviciosAnuales) {
            const { url, program, capa } = servicio;
            const fullUrl = `${url}?feini=${feIni}&fefin=${feFin}`;

            // Realiza la llamada al servicio
            const response = await axios.post(fullUrl, {
                // Cuerpo de la solicitud si es necesario
            }
            // ,{
            //     // Configuración adicional
            //     httpsAgent: new https.Agent({ rejectUnauthorized: false })
            // }
            );
            console.log(response.data.error);
            // console.log(`Llamada exitosa al servicio ${program}, capa ${capa}:`, response.data);
            console.log(`Llamada exitosa al servicio ${program}, capa ${capa}:`);
            console.log(fullUrl);
            // Busca un registro existente o crea uno nuevo
        }
    } catch (error) {
        console.error('Error al llamar a los servicios:', error);
    }
};