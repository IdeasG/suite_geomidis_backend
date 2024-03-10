import "dotenv/config";

// import { CapasService } from "../../services/espaciales/capas.js";
import fs from "fs";
import { sequelize } from "../../config/postgres/sequelize.js";
import axios from "axios";
import path from "path";
// const capasService = new CapasService();

export class MapfishController {
  constructor() {}

  async postImagen(req,res) {
    try {
      // Obtener el dato base64 de la imagen desde el cuerpo de la solicitud
      const { imagenGrande, imagenAlejada } = req.body;
      // Separar el prefijo "data:image/jpeg;base64," del dato base64
      const base64Image = imagenGrande.split(";base64,").pop();
      
      // Decodificar el dato base64 en un buffer
      const imageBuffer = Buffer.from(base64Image, "base64");

      // Generar un nombre de archivo único
      const fileName = Date.now() + ".jpg";

      // Ruta de la carpeta donde se guardará la imagen
      const folderPath = path.join(process.cwd(), "uploads");

      // Crear la carpeta si no existe
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Guardar la imagen en la carpeta
      fs.writeFileSync(path.join(folderPath, fileName), imageBuffer);

      const base64ImageAl = imagenAlejada.split(";base64,").pop();
      
      // Decodificar el dato base64 en un buffer
      const imageBufferAl = Buffer.from(base64ImageAl, "base64");

      // Generar un nombre de archivo único
      const fileNameAl = Date.now() + ".jpg";

      // Ruta de la carpeta donde se guardará la imagen
      const folderPathAl = path.join(process.cwd(), "uploads");

      // Crear la carpeta si no existe
      if (!fs.existsSync(folderPathAl)) {
        fs.mkdirSync(folderPathAl, { recursive: true });
      }

      // Guardar la imagen en la carpeta
      fs.writeFileSync(path.join(folderPathAl, fileNameAl), imageBufferAl);

      res.status(200).json({ status: "success", message: "Imagen recibida y guardada con éxito", imagenGrande: fileName, imagenAlejada: fileNameAl});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al procesar la imagen" });
    }
  }
  async getPrint(req, res, next) {
    let json = req.body;
    try {
        // console.log(json);
        let ss = await axios.post("http://185.214.135.183:8080/print/print/buildreport.pdf",
        // let ss = await axios.post("http://localhost:8080/print/print/buildreport.pdf",
        json,
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = ss.data
        // console.log(json)
        // let data = await n2yo_service.getPrint(json);
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
        res.setHeader('Content-Length', data.length)
        return res.end(data)
    }
    catch (err) {
        return next(err);
    }
  }
}
