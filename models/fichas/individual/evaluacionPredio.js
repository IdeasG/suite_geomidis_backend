import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EvaluacionPredio = sequelize.define(
  "ti_evaluacion_predio",
  {
    id_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ficha: {
      type: DataTypes.INTEGER,
    },
    cod_tipo_eval_predio: {
      type: DataTypes.STRING,
    },
    n_inv_area_colindante: {
      type: DataTypes.NUMBER,
    },
    n_inv_area_jard_aisla: {
      type: DataTypes.STRING,
    },
    n_inv_area_publica: {
      type: DataTypes.STRING,
    },
    n_inv_area_intangible: {
      type: DataTypes.STRING,
    },
  },
  {
    schema: "public",
    timestamps: false,
  }
);

export default EvaluacionPredio;
