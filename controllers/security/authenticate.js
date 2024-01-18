import { AuthenticateService } from "../../services/security/authenticate.js";

const authenticateService = new AuthenticateService();

export class AuthenticateController {
  constructor() {}

  async signIn(req, res) {
    const { c_usuario, c_contrasena } = req.body;
    try {
      const data = await authenticateService.signIn(c_usuario, c_contrasena);
      res.status(200).json(data);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async refreshToken(req, res) {
    const { id, id_cliente } = req.user;
    try {
      const data = await authenticateService.refreshToken(id, id_cliente);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTools(req, res) {
    const { id, id_cliente } = req.user;
    const id_sistema = 1;
    try {
      const data = await authenticateService.getTools(
        id,
        id_cliente,
        id_sistema
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getComp(req, res) {
    const { id } = req.params;
    try {
      const data = await authenticateService.getComp(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    const { id, id_cliente } = req.user;
    try {
      const data = await authenticateService.getProfile(id, id_cliente);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRol(req, res) {
    try {
      const data = await authenticateService.getRol();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getToolsByRol(req, res) {
    const { id } = req.params;
    try {
      const data = await authenticateService.getToolsByRol(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveRol(req, res) {
    const { fk_sistema, fk_cliente, nombre, descripcion } = req.body;
    try {
      const data = await authenticateService.saveRol(
        fk_sistema,
        fk_cliente,
        nombre,
        descripcion
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveRolTools(req, res) {
    const { fk_rol, fk_modulo, fk_grupo, fk_menu } = req.body;
    try {
      const data = await authenticateService.saveRolTools(
        fk_rol,
        fk_modulo,
        fk_grupo,
        fk_menu
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRol(req, res) {
    const { id } = req.params;
    try {
      const data = await authenticateService.deleteRol(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRolTools(req, res) {
    const { id_rol, fk_modulo, fk_grupo, fk_menu } = req.params;
    try {
      const data = await authenticateService.deleteRolTools(
        id_rol,
        fk_modulo,
        fk_grupo,
        fk_menu
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
