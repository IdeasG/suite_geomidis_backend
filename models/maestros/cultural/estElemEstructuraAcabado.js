import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const EstElemEstructuraAcabado = sequelize.define(
  "td_elem_estruc_acab",
  {
    cod_elem_estruc_acab: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_elem_estruc_acab: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default EstElemEstructuraAcabado;
