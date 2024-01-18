import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const GeoportalComponent = sequelize.define(
  "geoportales_component",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_geoportal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_componente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    schema: "administracion",
  }
);

export default GeoportalComponent;
