import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const AfecNaturales = sequelize.define(
  "td_afec_naturales",
  {
    cod_afec_natural: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_afec_natural: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default AfecNaturales;
