import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const SpManzana = sequelize.define(
  "sp_manzana",
  {
    id_manzana: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_hab_urbana: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_cod_mzna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    glgis: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    id_manzana_urb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_sector_s: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);

export default SpManzana;
