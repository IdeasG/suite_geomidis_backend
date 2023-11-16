import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const SuperGrupo = sequelize.define(
  "supergrupos",
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
    fk_cliente: {
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
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default SuperGrupo;
