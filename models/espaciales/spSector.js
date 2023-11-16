import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";
const SpSector = sequelize.define(
  "sp_sector",
  {
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_distrito: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    c_cod_sector: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    c_nomb_sector: {
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
    id_sector_urb: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "espaciales",
  }
);

export default SpSector;
