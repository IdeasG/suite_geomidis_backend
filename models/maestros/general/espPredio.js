import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EspPredio = sequelize.define(
  "td_cond_esp_predio",
  {
    cod_cond_esp_predio: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cond_esp_predio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default EspPredio;
