import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const SpLote = sequelize.define(
  "sp_lote",
  {
    id_lote: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_manzana: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_cod_lote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    analisis_alf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    analisis_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado_lote: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    glgis: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);

export default SpLote;
