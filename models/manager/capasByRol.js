import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const CapaByRol = sequelize.define(
  "rol_capas",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_capa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default CapaByRol;
