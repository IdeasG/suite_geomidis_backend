import { UsoCapasService } from "../../services/auditoria/usoCapas.js";
const usoCapasService = new UsoCapasService();

export class UsoCapasController {
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
      const result = await usoCapasService.registrarUso(data);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async registrarUsoInvitado(req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(ip);
      console.log(req.body);
      const data = {
        ...req.body,
        ip,
        c_tipo_usuario: "invitado"
      };
      const result = await usoCapasService.registrarUso(data);
      res.status(201).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async listarUsos(req, res) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize;
      const result = await usoCapasService.listarUsos(offset, pageSize);
      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async agrupadoPorTipoUsuarioFiltrado(req, res) {
    try {
      const { c_tipo_usuario, id_geovisor } = req.params;
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      const result = await usoCapasService.agrupadoPorTipoUsuarioFiltrado(c_tipo_usuario, id_geovisor, offset, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async agrupadoPorRol(req, res) {
    try {
      const { id_rol, id_geovisor } = req.params;
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      const result = await usoCapasService.agrupadoPorRol(id_rol, id_geovisor, offset, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async agrupadoPorUsuario(req, res) {
    try {
      const { id_usuario, id_geovisor } = req.params;
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      const result = await usoCapasService.agrupadoPorUsuario(id_usuario, id_geovisor, offset, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async agrupadoPorFecha(req, res) {
    try {
      const { feini, fefin, id_geovisor, page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      const result = await usoCapasService.agrupadoPorFecha(feini, fefin, id_geovisor, offset, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
