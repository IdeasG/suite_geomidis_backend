import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoArquitecturaMhc = sequelize.define(
  "td_tipo_arquitectura_mhc",
  {
    cod_tipo_arq_mhc: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_tipo_arq_mhc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoArquitecturaMhc;
