import UsoHerramientas from "../../models/auditoria/usoHerramientas.js";

export class UsoHerramientasService {
  async registrarUso(data) {
    return await UsoHerramientas.create(data);
  }
  async listarUsos(offset = 0, limit = 10) {
    return await UsoHerramientas.findAll({ offset, limit, order: [["fecha", "desc"]] });
  }
}
