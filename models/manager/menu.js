import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgres/sequelize.js";

const Menu = sequelize.define(
  "menus",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pk_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    c_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    b_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    schema: "suite",
    timestamps: false,
  }
);

export default Menu;
