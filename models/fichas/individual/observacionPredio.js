import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const ObservacionPredio = sequelize.define(
  "tg_observaciones",
  {
    id_observaciones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    c_observaciones: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default ObservacionPredio;
