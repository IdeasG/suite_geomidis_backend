import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const UbicacionPredio = sequelize.define(
  "ti_ubicacion_predio",
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
    cod_tipo_interior: {
      type: DataTypes.STRING,
    },
    n_num_interior: {
      type: DataTypes.STRING,
    },
    id_hab_urb: {
      type: DataTypes.INTEGER,
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

export default UbicacionPredio;
