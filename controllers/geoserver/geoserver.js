import fetch from "node-fetch";
import https from "https";

export class GeoserverController {
  constructor() {}

  async getDataGeoserver(req, res, next) {
    const { url } = req.body; // La URL completa se envía en el cuerpo de la solicitud
    try {
      // Leer credenciales y base URL desde variables de entorno
      const username = process.env.USER_GEOSERVER;
      const password = process.env.PASS_GEOSERVER;

      // Codificar credenciales en Base64
      const encodedCredentials = Buffer.from(`${username}:${password}`).toString("base64");

      // Configurar un agente HTTPS que ignore la verificación de SSL (si es necesario)
      const agent = new https.Agent({  
        rejectUnauthorized: false,  // Permite conexiones con certificados no verificados
      });

      // Crear una nueva promesa para fetch con el agente HTTPS
      const fetchPromise = fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`, // Autenticación básica
        },
        agent,  // Usar el agente HTTPS configurado
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json(); // Suponiendo que la respuesta es JSON
      })
      .then(data => {
        // Manejar los datos de GeoServer como necesites
        return res.json(data); // Retorna los datos al cliente si es necesario
      })
      .catch(error => {
        console.error('Error al hacer fetch a GeoServer:', error);
        return next(error); // En caso de error, pasa al siguiente middleware
      });

      // Espera a que la promesa se resuelva y se procesen los datos
      await fetchPromise;

    } catch (err) {
      console.error("Error al solicitar datos de GeoServer:", err.message);
      return next(err);
    }
  }
}
