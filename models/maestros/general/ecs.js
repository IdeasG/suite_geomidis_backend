import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const Ecs = sequelize.define(
  "td_ecs",
  {
    cod_ecs: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_ecs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default Ecs;
