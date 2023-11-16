import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const ClasifPredio = sequelize.define(
  "td_clasif_predio",
  {
    cod_clasif_predio: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_clasif_predio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default ClasifPredio;
