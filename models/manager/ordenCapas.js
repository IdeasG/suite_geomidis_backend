import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const OrdenCapa = sequelize.define(
  "orden_capas",
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
    j_orden: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default OrdenCapa;
