import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Ecc = sequelize.define(
  "td_ecc",
  {
    cod_ecc: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_ecc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default Ecc;
