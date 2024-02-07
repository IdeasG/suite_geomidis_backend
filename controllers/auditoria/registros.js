import "dotenv/config";
import { RegistrosService } from "../../services/auditoria/registros.js";

const registrosService = new RegistrosService();

export class AuditoriaController {
  constructor() {}

  async getDatosAuditoria(req, res) {
    const { page = 1, pageSize = 5, feini, fefin } = req.query;
    try {
      const offset = (page - 1) * pageSize;
      const resultados = await registrosService.getDatosAuditoria(offset,pageSize,feini,fefin);
      res.status(200).json({ status: "success", data: resultados });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
