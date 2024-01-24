import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Geoportal = sequelize.define(
  "geoportales",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    background: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    schema: "administracion",
  }
);

export default Geoportal;
