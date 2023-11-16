import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoParRegistral = sequelize.define(
  "td_tipo_parregistral",
  {
    cod_tipo_parregistral: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_tipo_parregistral: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoParRegistral;
