import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const UbicacionPredioViaCuadraDetail = sequelize.define(
  "ti_ubicacion_predio_via_cuadra_detail",
  {
    id_ubicacion_via_cuadra: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_ficha: DataTypes.INTEGER,
    id_via: DataTypes.INTEGER,
    id_cuadra: DataTypes.INTEGER,
    cod_tipo_puerta: DataTypes.STRING,
    n_num_muni: DataTypes.STRING,
    cod_cond_num: DataTypes.STRING,
    n_nro_cert_num: DataTypes.STRING,
    c_cod_via: DataTypes.STRING,
    c_nomb_via: DataTypes.STRING,
    cod_tipo_via: DataTypes.STRING,
    nomb_tipo_puerta: DataTypes.STRING,
    nomb_cond_num: DataTypes.STRING,
  },
  {
    tableName: "ti_ubicacion_predio_via_cuadra_detail",
    timestamps: false,
  }
);

export default UbicacionPredioViaCuadraDetail;
