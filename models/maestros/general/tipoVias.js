import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoVia = sequelize.define(
  "td_tipo_via",
  {
    cod_tipo_via: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_tipo_via: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoVia;
