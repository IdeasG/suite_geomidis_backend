import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Sistema = sequelize.define(
  "sistemas",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    c_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_background: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_sistema: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    schema: "suite",
  }
);

export default Sistema;
