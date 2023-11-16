import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Capa = sequelize.define(
  "capas",
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
    pk_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    c_tabla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_capa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default Capa;
