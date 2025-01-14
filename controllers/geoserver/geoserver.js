import "dotenv/config";
import axios from "axios";

export class GeoserverController {
  constructor() {}

  async getDataGeoserver(req, res, next) {
    const { url } = req.body; // La URL completa se envía en el cuerpo de la solicitud
    try {
      // Leer credenciales y base URL desde variables de entorno
      const username = process.env.USER_GEOSERVER;
      const password = process.env.PASS_GEOSERVER;

      // Crear cliente Axios con autenticación básica
      const api = axios.create({
        maxContentLength: 500 * 1024 * 1024, // 50MB
        maxBodyLength: 500 * 1024 * 1024, // 50MB
        headers: {
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`, // Codifica las credenciales en Base64
        },
      });

      // Realizar solicitud GET al GeoServer
      const response = await api.get(url, {
        responseType: "arraybuffer", // Para manejar diferentes tipos de respuesta (e.g., JSON, archivo, etc.)
      });

      // Enviar la respuesta al cliente
      res.set({
        "Content-Type": response.headers["content-type"], // Mantener el tipo de contenido original
      });
      return res.end(response.data);
    } catch (err) {
      console.error("Error al solicitar datos de GeoServer:", err.message);
      return next(err);
    }
  }
}
