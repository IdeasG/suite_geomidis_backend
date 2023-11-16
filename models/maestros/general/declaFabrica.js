import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const DeclaFabrica = sequelize.define(
  "td_decla_fabrica",
  {
    cod_decla_fabrica: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_decla_fabrica: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default DeclaFabrica;
