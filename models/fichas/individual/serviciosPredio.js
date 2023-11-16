import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const ServicioPredio = sequelize.define(
  "tibc_servicios",
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    c_agua: {
      type: DataTypes.STRING(2),
    },
    c_luz: {
      type: DataTypes.STRING(2),
    },
    c_telefono: {
      type: DataTypes.STRING(2),
    },
    c_desague: {
      type: DataTypes.STRING(2),
    },
    c_gas: {
      type: DataTypes.STRING(2),
    },
    nro_cont_agua: {
      type: DataTypes.STRING,
    },
    nro_sum_luz: {
      type: DataTypes.STRING,
    },
    nro_sum_telefono: {
      type: DataTypes.STRING,
    },
    nro_sum_gas: {
      type: DataTypes.STRING,
    },
    c_internet: {
      type: DataTypes.STRING,
    },
    c_cable: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default ServicioPredio;
