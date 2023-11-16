import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const UbicacionPredioVia = sequelize.define(
  "ti_ubicacion_predio_via_cuadra",
  {
    id_ubicacion_via_cuadra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    id_via: {
      type: DataTypes.INTEGER,
    },
    id_cuadra: {
      type: DataTypes.INTEGER,
    },
    cod_tipo_puerta: {
      type: DataTypes.STRING,
    },
    n_num_muni: {
      type: DataTypes.STRING,
    },
    cod_cond_num: {
      type: DataTypes.STRING,
    },
    n_nro_cert_num: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false, // Si no tienes campos de createdAt y updatedAt
  }
);

export default UbicacionPredioVia;
