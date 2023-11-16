import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const CondTitular = sequelize.define(
  "td_cond_conductor",
  {
    cod_cond: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cond: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default CondTitular;
