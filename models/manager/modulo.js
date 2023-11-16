import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Modulo = sequelize.define(
  "modulos",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pk_sistema: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_modulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "suite",
    timestamps: false,
  }
);

export default Modulo;
