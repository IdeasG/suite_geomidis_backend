import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const AfecAntropicas = sequelize.define(
  "td_afec_antropicas",
  {
    cod_afec_antrop: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_afec_antrop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default AfecAntropicas;
