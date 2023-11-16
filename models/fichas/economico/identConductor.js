import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const IdentConductor = sequelize.define(
  "tae_conductores",
  {
    id_ubicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    id_persona: {
      type: DataTypes.STRING,
    },
    cod_cond: {
      type: DataTypes.STRING,
    },
    c_otros_cod_cond: {
      type: DataTypes.STRING,
    },
    c_nomb_comercial: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default IdentConductor;
