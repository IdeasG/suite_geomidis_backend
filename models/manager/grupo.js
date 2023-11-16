import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Grupo = sequelize.define(
  "grupos",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pk_modulo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_grupo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "suite",
    timestamps: false,
  }
);

export default Grupo;
