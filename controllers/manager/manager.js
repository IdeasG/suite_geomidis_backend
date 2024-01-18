import { ManagerService } from "../../services/manager/manager.js";

const managerService = new ManagerService();

export class ManagerController {
  constructor() {}

  async getSistemas(req, res) {
    try {
      const data = await managerService.getSistemas();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveModuloSistema(req, res) {
    const { pk_sistema, c_modulo, c_descripcion, url, icono } = req.body;
    try {
      const data = await managerService.saveModuloSistema(
        pk_sistema,
        c_modulo,
        c_descripcion,
        url,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveGrupoSistema(req, res) {
    const { pk_modulo, c_nombre, url } = req.body;
    try {
      const data = await managerService.saveGrupoSistema(
        pk_modulo,
        c_nombre,
        url
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveMenuSistema(req, res) {
    const { pk_grupo, c_nombre, icono, url } = req.body;
    try {
      const data = await managerService.saveMenuSistema(
        pk_grupo,
        c_nombre,
        icono,
        url
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //CAPAS
  async saveSuperGrupoSistema(req, res) {
    const { pk_sistema, fk_cliente, c_modulo, c_descripcion, icono } = req.body;
    try {
      const data = await managerService.saveSuperGrupoSistema(
        pk_sistema,
        fk_cliente,
        c_modulo,
        c_descripcion,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveGrupoCapasSistema(req, res) {
    const { pk_sistema, pk_modulo, fk_cliente, c_nombre } = req.body;
    try {
      const data = await managerService.saveGrupoCapasSistema(
        pk_sistema,
        pk_modulo,
        fk_cliente,
        c_nombre
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCapasSistema(req, res) {
    const { pk_sistema, pk_grupo, fk_cliente, c_nombre, c_tabla, icono } =
      req.body;
    try {
      const data = await managerService.saveCapasSistema(
        pk_sistema,
        pk_grupo,
        fk_cliente,
        c_nombre,
        c_tabla,
        icono
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCapasByRol(req, res) {
    const { fk_rol, fk_capa } = req.body;
    try {
      const data = await managerService.saveCapasByRol(fk_rol, fk_capa);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //

  //DELETE
  async deleteModuloSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteModuloSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteGrupoSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteGrupoSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMenuSistema(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteMenuSistema(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCapasByRol(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteCapasByRol(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // FIN DELETE

  async getSistemabyId(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getSistemabyId(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCapasById(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getCapasById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //CLIENTES
  async getClientes(req, res) {
    try {
      const data = await managerService.getClientes();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientesById(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getClientesById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSistemasByClientes(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.getSistemasByClientes(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveSistemasByCliente(req, res) {
    const { id_cliente, id } = req.body;
    try {
      const data = await managerService.saveSistemasByCliente(id_cliente, id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveGeoportales(req, res) {
    const {
      nombre,
      color_primary,
      logo_bs,
      descripcion,
      componentsIzquierda,
      componentsDerecha,
      componentsMenu,
      componentsArriba,
    } = req.body;
    try {
      const data = await managerService.saveGeoportales(
        nombre,
        color_primary,
        logo_bs,
        descripcion,
        componentsIzquierda,
        componentsDerecha,
        componentsMenu,
        componentsArriba
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteSistemasByCliente(req, res) {
    const { id_cliente, id } = req.params;
    try {
      const data = await managerService.deleteSistemasByCliente(id_cliente, id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCliente(req, res) {
    const { id } = req.params;
    try {
      const data = await managerService.deleteCliente(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async saveCliente(req, res) {
    const {
      nombre,
      color_primary,
      color_secundary,
      color_tercero,
      color_cuarto,
      celular,
      pais,
      ubigeo,
      organizacion,
      direccion,
      referencia,
      correo,
      status,
      cargo,
      logo_bs,
      logo_horizontal_bs,
      portada_bs,
    } = req.body;
    try {
      const data = await managerService.saveCliente(
        nombre,
        color_primary,
        color_secundary,
        color_tercero,
        color_cuarto,
        celular,
        pais,
        ubigeo,
        organizacion,
        direccion,
        referencia,
        correo,
        status,
        cargo,
        logo_bs,
        logo_horizontal_bs,
        portada_bs
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
