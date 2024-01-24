import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const ComponentByRol = sequelize.define(
  "geoportales_component_rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_geoportal: {
      type: DataTypes.INTEGER,
    },
    fk_componente: {
      type: DataTypes.INTEGER,
    },
    fk_rol: {
      type: DataTypes.INTEGER,
    },
    position: {
      type: DataTypes.INTEGER,
    },
    orden: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: "administracion",
    timestamps: false,
  }
);

export default ComponentByRol;
