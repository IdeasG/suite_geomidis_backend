import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EstCivil = sequelize.define(
  "td_est_civil",
  {
    cod_est_civil: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_est_civil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default EstCivil;
