import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const FcTipoDoc = sequelize.define(
  "td_fc_tipo_doc",
  {
    cod_fc_tipo_doc: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_fc_tipo_doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default FcTipoDoc;
