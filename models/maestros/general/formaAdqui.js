import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const FormaAdqui = sequelize.define(
  "td_forma_adqui",
  {
    cod_forma_adqui: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_forma_adqui: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default FormaAdqui;
