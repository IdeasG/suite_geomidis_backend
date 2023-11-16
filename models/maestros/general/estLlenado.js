import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EstLlenado = sequelize.define(
  "td_est_llenado",
  {
    cod_est_llenado: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_est_llenado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default EstLlenado;
