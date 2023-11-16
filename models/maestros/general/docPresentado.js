import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const DocPresentado = sequelize.define(
  "td_documento_presentado",
  {
    cod_doc_presentado: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_doc_presentado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default DocPresentado;
