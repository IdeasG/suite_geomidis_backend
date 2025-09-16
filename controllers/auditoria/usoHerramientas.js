import { UsoHerramientasService } from "../../services/auditoria/usoHerramientas.js";
const usoHerramientasService = new UsoHerramientasService();

export class UsoHerramientasController {
  async registrarUsoLogueado(req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const data = {
        ...req.body,
        ip,
        id_usuario: req.user.id,
        id_rol: req.user.id_rol,
        c_tipo_usuario: "logueado"
      };
      const result = await usoHerramientasService.registrarUso(data);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async registrarUsoInvitado(req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const data = {
        ...req.body,
        ip,
        c_tipo_usuario: "invitado"
      };
      const result = await usoHerramientasService.registrarUso(data);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async listarUsos(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize;
      const result = await usoHerramientasService.listarUsos(offset, pageSize);
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
