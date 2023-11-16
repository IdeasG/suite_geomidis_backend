import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/postgres/sequelize.js";

const CatInmueble = sequelize.define(
  "td_categoria_inmueble",
  {
    cod_cat_inmueble: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nomb_cat_inmueble: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
  }
);

export default CatInmueble;
