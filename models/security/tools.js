import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const ToolsDetail = sequelize.define(
  "herramienta_roles_detail",
  {
    fk_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id: {
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
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default ToolsDetail;
