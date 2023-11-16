import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const SpDistrito = sequelize.define(
  "sp_distrito",
  {
    id_distrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    c_ubigeo_dist: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);

export default SpDistrito;
