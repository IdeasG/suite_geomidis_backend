import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const GrupoCapa = sequelize.define(
  "grupos_capa",
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
    pk_modulo: {
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
    b_grupo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default GrupoCapa;
