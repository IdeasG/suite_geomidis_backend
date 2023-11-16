import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const TiSisCliente = sequelize.define(
  "ti_sis_cliente",
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
    desde: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    schema: "suite",
  }
);

export default TiSisCliente;
