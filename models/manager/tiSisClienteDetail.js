import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const TiSisClienteD = sequelize.define(
  "ti_sis_cliente_detalle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_cliente: {
      type: DataTypes.INTEGER,
    },
    fk_sistema: {
      type: DataTypes.INTEGER,
    },
    c_nombre: {
      type: DataTypes.STRING,
    },
    c_descripcion: {
      type: DataTypes.STRING,
    },
    c_logo: {
      type: DataTypes.STRING,
    },
    c_background: {
      type: DataTypes.STRING,
    },
    b_sistema: {
      type: DataTypes.BOOLEAN,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    schema: "suite",
  }
);

export default TiSisClienteD;
