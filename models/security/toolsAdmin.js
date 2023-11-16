import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const ToolsAdmin = sequelize.define(
  "herramienta_roles_admin",
  {
    fk_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    pk_sistema: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
    },
    pk_sistema: {
      type: DataTypes.INTEGER,
    },
    c_modulo: {
      type: DataTypes.STRING,
    },
    c_descripcion: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    icono_modulo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
    },
    pk_modulo: {
      type: DataTypes.INTEGER,
    },
    c_nombre_grupo: {
      type: DataTypes.STRING,
    },
    url_grupo: {
      type: DataTypes.STRING,
    },
    b_grupo: {
      type: DataTypes.BOOLEAN,
    },
    id_menu: {
      type: DataTypes.INTEGER,
    },
    pk_grupo: {
      type: DataTypes.INTEGER,
    },
    c_nombre_menu: {
      type: DataTypes.STRING,
    },
    icono_menu: {
      type: DataTypes.STRING,
    },
    url_menu: {
      type: DataTypes.STRING,
    },
    b_menu: {
      type: DataTypes.BOOLEAN,
    },
    activo: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default ToolsAdmin;
