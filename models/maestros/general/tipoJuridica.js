import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoJuridica = sequelize.define(
  "td_tipo_perjuridica",
  {
    cod_tipo_perjuridica: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_tipo_perjuridica: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoJuridica;
