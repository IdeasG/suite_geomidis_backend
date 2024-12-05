import { RasterService } from "../../services/raster/raster.js";
import { exec } from "child_process";

const rasterService = new RasterService();

export class RasterController {
  constructor() {}

  create = async (req, res) => {
    const {lat,lon,distancia,nombre} = req.body;
    try {
      // Comando para ejecutar el script remoto con sudo
      const comando = `cd /opt/rcost_midis && sudo ./main.sh ${lat} ${lon} ${distancia} /opt/tomcat/apache-tomcat-9.0.89/webapps/geoserver/data/coverages/rcost/${nombre}`;
      const sshCommand = `ssh root@84.247.176.139 "bash -c '${comando}'"`;

      console.log(sshCommand);

      // Ejecutar el comando
      exec(sshCommand, (error, stdout, stderr) => {
        // Imprimir errores críticos solamente
        if (error) {
          console.error(`Error ejecutando el comando: ${error.message}`);
          return res.status(500).json({ error: "Ocurrió un error al ejecutar el proceso. " + error.message });
        }

        // Ignorar mensajes de advertencia conocidos
        const warningsToIgnore = [
          "I need something more specific",
          "Precision loss",
          "SetColorTable() only supported for Byte or UInt16 bands",
          "Starting GRASS GIS...",
          "Creating new GRASS GIS location",
          "Cleaning up temporary files...",
          "Executing <bash> ...",
          "Importing raster map <raster_velocidad>...",
          "Scanning input for column types...",
          "Number of columns:",
          "Number of rows:",
          "Importing points...",
          "Building topology for vector map",
          "Registering primitives...",
          "Reading raster map",
          "Reading vector map",
          "Finding cost path...",
          "Writing output raster map",
          "r.cost complete. Peak cost value",
          "Forcing raster export",
          "Checking GDAL data type and nodata value...",
          "Using GDAL data type",
          "Exporting raster data to GTiff format...",
          "r.out.gdal complete. File",
          "Execution of <bash> finished.",
          "100%",
          "raster <salida>. This can be avoided by using Float64",
          "/opt/tomcat/apache-tomcat-9.0.89/webapps/geoserver/data/coverages/rcost/",
          "created"
        ];

        const criticalErrors = stderr
          .split("\n")
          .filter(line => !warningsToIgnore.some(warning => line.includes(warning)))
          .join("\n");

        // Verifica si hay errores críticos después de filtrar
        if (criticalErrors) {
          console.error(`stderr: ${criticalErrors.split('\n')[0]}`);
          return res.status(500).json({ error: "Ocurrió un error en el procesamiento del raster." });
        }

        // Si no hay errores críticos, responder con un mensaje de éxito
        console.log("Proceso de creación de raster completado correctamente.");
        res.status(201).json({ status: "success", message: "El proceso se completó correctamente y el archivo TIFF se generó." });
      });
    } catch (error) {
      console.error("Error en el controlador:", error.message);
      res.status(500).json({ error: "Error: " + error.message });
    }
  };
}
