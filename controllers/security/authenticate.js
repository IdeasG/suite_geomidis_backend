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

  async getComponentesByGeoportal(req, res) {
    const { id, id_rol, id_cliente } = req.user;
    const { id_geoportal } = req.params;
    try {
      const data = await authenticateService.getComponentesByGeoportal(
        id,
        id_rol,
        id_cliente,
        id_geoportal
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getComponentesByGeoportalI(req, res) {
    const { id, id_rol, id_cliente } = req.user;
    try {
      const data = await authenticateService.getComponentesByGeoportalI(
        id,
        id_rol,
        id_cliente
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsuariosByGeoportal(req, res) {
    const { id } = req.params;
    try {
      const data = await authenticateService.getUsuariosByGeoportal(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUsuariosInternoByGeoportal(req, res) {
    const { id_cliente } = req.user;
    const { page = 1, pageSize = 5 } = req.query;
    try {
      const data = await authenticateService.getUsuariosInternoByGeoportal(
        id_cliente,
        page,
        pageSize
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUsuariosByGeoportal(req, res) {
    const { id, usuario, contrasena } = req.body;
    try {
      const data = await authenticateService.createUsuariosByGeoportal(
        id,
        usuario,
        contrasena
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUsuariosInternoByGeoportal(req, res) {
    const { id_cliente } = req.user;
    const {
      dni,
      nombres,
      ape_paterno,
      ape_materno,
      correo,
      celular,
      tipo_usuario,
      id_rol,
    } = req.body;
    try {
      const data = await authenticateService.createUsuarioInternosByGeoportal(
        dni,
        nombres,
        ape_paterno,
        ape_materno,
        correo,
        celular,
        tipo_usuario,
        id_rol,
        id_cliente
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error: " + error });
    }
  }

  async createComponentByRol(req, res) {
    const {
      componentsIzquierda,
      componentsDerecha,
      componentsMenu,
      componentsArriba,
      id_rol,
    } = req.body;
    const { id_cliente } = req.user;
    try {
      const data = await authenticateService.createComponentByRol(
        id_cliente,
        componentsIzquierda,
        componentsDerecha,
        componentsMenu,
        componentsArriba,
        id_rol
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUsuariosByGeoportal(req, res) {
    const { id } = req.params;
    try {
      const data = await authenticateService.deleteUsuariosByGeoportal(id);
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
    const { id_cliente } = req.user;
    try {
      const data = await authenticateService.getRol(id_cliente);
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
    const { nombre } = req.body;
    const { id_cliente } = req.user;
    try {
      const data = await authenticateService.saveRol(nombre, id_cliente);
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
