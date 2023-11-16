import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const HerramientaRoles = sequelize.define(
  "herramienta_roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fk_modulo: {
      type: DataTypes.INTEGER,
    },
    fk_grupo: {
      type: DataTypes.INTEGER,
    },
    fk_menu: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default HerramientaRoles;
