import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const PredioCatEn = sequelize.define(
  "td_predio_cat_en",
  {
    cod_predio_cat_en: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_predio_cat_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default PredioCatEn;
