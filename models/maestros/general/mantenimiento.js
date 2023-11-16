import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Mantenimiento = sequelize.define(
  "td_mantenimiento",
  {
    cod_mantenimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_mantenimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default Mantenimiento;
