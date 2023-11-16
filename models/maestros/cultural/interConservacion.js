import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const InterConservacion = sequelize.define(
  "td_inter_conserv",
  {
    cod_interv_conserv: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_inter_conserv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default InterConservacion;
