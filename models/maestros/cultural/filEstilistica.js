import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const FilEstilistica = sequelize.define(
  "td_fil_estilistica",
  {
    cod_fil_estilistica: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_fil_estilistica: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default FilEstilistica;
