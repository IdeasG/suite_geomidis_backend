import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const CondDeclarante = sequelize.define(
  "td_cond_declarante",
  {
    cod_cond_decla: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cond_decla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default CondDeclarante;
