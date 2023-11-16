import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Uca = sequelize.define(
  "td_uca",
  {
    cod_uca: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_uca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default Uca;
