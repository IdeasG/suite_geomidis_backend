import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoPuerta = sequelize.define(
  "td_tipo_puerta",
  {
    cod_tipo_puerta: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_tipo_puerta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoPuerta;
