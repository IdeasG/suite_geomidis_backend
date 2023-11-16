import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const UbicacionPredioDetail = sequelize.define(
  "ti_ubicacion_predio_detail",
  {
    id_ubicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    c_nomb_edificacion: {
      type: DataTypes.STRING,
    },
    cod_tipo_edificacion: {
      type: DataTypes.STRING,
    },
    nomb_tipo_edificacion: {
      type: DataTypes.STRING,
    },
    cod_tipo_interior: {
      type: DataTypes.STRING,
    },
    nomb_tipo_interior: {
      type: DataTypes.STRING,
    },
    n_num_interior: {
      type: DataTypes.STRING,
    },
    id_hab_urb: {
      type: DataTypes.INTEGER,
    },
    cod_hab_urb: {
      type: DataTypes.STRING,
    },
    nombre_hab_urb: {
      type: DataTypes.STRING,
    },
    c_zse_hab_urb: {
      type: DataTypes.STRING,
    },
    c_manzana_hab_urb: {
      type: DataTypes.STRING,
    },
    c_lote_hab_urb: {
      type: DataTypes.STRING,
    },
    c_sublote_hab_urb: {
      type: DataTypes.STRING,
    },
    estpriedad: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default UbicacionPredioDetail;
