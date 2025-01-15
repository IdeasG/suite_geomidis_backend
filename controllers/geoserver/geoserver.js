import "dotenv/config";

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

      // Realizar solicitud GET al GeoServer usando fetch
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`, // Autenticación básica
        },
      });

      // Verificar si la solicitud fue exitosa
      if (!response.ok) {
        throw new Error(`Error al solicitar datos de GeoServer: ${response.status} ${response.statusText}`);
      }

      // Obtener los datos como un buffer
      const data = await response.arrayBuffer();

      // Enviar la respuesta al cliente
      res.set({
        "Content-Type": response.headers.get("content-type"), // Mantener el tipo de contenido original
      });
      return res.end(Buffer.from(data));
    } catch (err) {
      console.error("Error al solicitar datos de GeoServer:", err.message);
      return next(err);
    }
  }
}
