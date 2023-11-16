import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Mep = sequelize.define(
  "td_mep",
  {
    cod_mep: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_mep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default Mep;
