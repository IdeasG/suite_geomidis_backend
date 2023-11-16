import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EspTitular = sequelize.define(
  "td_cond_esp_titular",
  {
    cod_cond_esp_tit: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cond_esp_tit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default EspTitular;
