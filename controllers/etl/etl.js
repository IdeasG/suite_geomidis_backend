
import { EtlService } from "../../services/etl/etl.js";

const etlService = new EtlService();

export class EtlController {
  constructor() {}

  create = async (req, res) => {
    const { nombreEsquema, nombreTabla, indices, fileData } = req.body;
    try {
      const data = { nombreEsquema, nombreTabla, indices, fileData}
      const result = await etlService.registerTable(data);
      res.status(201).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error: " + error });
    }
  };
}
