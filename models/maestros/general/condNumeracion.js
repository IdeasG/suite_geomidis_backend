import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoCondNum = sequelize.define(
  "td_cond_num",
  {
    cod_cond_num: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cond_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);
export default TipoCondNum;
