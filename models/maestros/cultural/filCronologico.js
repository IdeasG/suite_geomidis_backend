import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const FilCronologico = sequelize.define(
  "td_fil_cronologica",
  {
    cod_fil_cronolog: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_fil_cronolog: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default FilCronologico;
