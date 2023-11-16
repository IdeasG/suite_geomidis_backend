import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const InterInmueble = sequelize.define(
  "td_inter_inmueble",
  {
    cod_inter_inmueble: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_inter_inmueble: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default InterInmueble;
