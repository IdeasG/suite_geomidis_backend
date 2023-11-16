import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const TipoMaterialConst = sequelize.define(
  "td_material_const",
  {
    cod_mat_const: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_mat_const: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default TipoMaterialConst;
