import { SecurityService } from "../../../services/glgis/security/index.js";

const securityService = new SecurityService();

export class SecurityController {
  constructor() {}

  create = async (req, res) => {
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
      const data = await securityService.createUser(
        dni,
        nombres,
        ape_paterno,
        ape_materno,
        correo,
        celular,
        tipo_usuario,
        id_rol
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error: " + error });
    }
  };

  async getAll(req, res) {
    const { page = 1, pageSize = 5 } = req.query;
    try {
      const data = await securityService.getAll(page, pageSize);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
