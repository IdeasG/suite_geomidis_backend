import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const ElemArquitectonico = sequelize.define(
  "td_elem_arquitectonico",
  {
    cod_elem_arq: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_elem_arq: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default ElemArquitectonico;
